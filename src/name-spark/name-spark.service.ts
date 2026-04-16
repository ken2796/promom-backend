import { Injectable, NotFoundException } from '@nestjs/common';
import { nameSeed } from './data/name-seed';
import { SearchNameSparkDto } from './dto/search-name-spark.dto';
import { UpdateNameFavoriteDto } from './dto/update-name-favorite.dto';
import { NameDetail, NameSearchResult } from './name-spark.types';
import { NameGender } from '../shared/enums/name-gender.enum';

const POPULARITY_BONUS: Record<string, number> = {
  Popular: 2,
  Steady: 1,
  Emerging: 0,
};

function cloneSeedNames(): NameDetail[] {
  return nameSeed.map((item) => ({
    ...item,
    styles: [...item.styles],
  }));
}

@Injectable()
export class NameSparkService {
  private readonly names = cloneSeedNames();

  search(input: SearchNameSparkDto): NameSearchResult[] {
    const { gender, origins, startingLetter, limit = 10 } = input;

    const filtered = this.names.filter((name) => {
      if (gender && name.gender !== gender && name.gender !== NameGender.Unisex) {
        return false;
      }
      if (origins && origins.length > 0 && !origins.includes(name.origin)) {
        return false;
      }
      if (startingLetter && !name.name.startsWith(startingLetter)) {
        return false;
      }
      return true;
    });

    const scored = filtered.map((name) => {
      let score = 0;
      if (gender) {
        score += name.gender === gender ? 3 : 1; // exact gender match outranks unisex
      }
      if (origins && origins.length > 0) {
        score += 2;
      }
      if (startingLetter) {
        score += 2;
      }
      score += POPULARITY_BONUS[name.popularity] ?? 0;
      return this.toSearchResult(name, score);
    });

    scored.sort(
      (a, b) => b.matchScore - a.matchScore || a.name.localeCompare(b.name),
    );

    return scored.slice(0, limit);
  }

  getNameDetail(id: string): NameDetail {
    return this.toDetail(this.findNameOrThrow(id));
  }

  updateFavorite(id: string, input: UpdateNameFavoriteDto): NameDetail {
    const name = this.findNameOrThrow(id);
    name.isFavorite = input.isFavorite;
    return this.toDetail(name);
  }

  private findNameOrThrow(id: string): NameDetail {
    const name = this.names.find((entry) => entry.id === id);

    if (!name) {
      throw new NotFoundException(`Name ${id} was not found.`);
    }

    return name;
  }

  protected toSearchResult(name: NameDetail, matchScore: number): NameSearchResult {
    return {
      id: name.id,
      name: name.name,
      meaning: name.meaning,
      gender: name.gender,
      origin: name.origin,
      matchScore,
      isFavorite: name.isFavorite,
    };
  }

  protected toDetail(name: NameDetail): NameDetail {
    return {
      ...name,
      styles: [...name.styles],
    };
  }
}
