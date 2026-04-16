import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { nameSeed } from './data/name-seed';
import { SearchNameSparkDto } from './dto/search-name-spark.dto';
import { UpdateNameFavoriteDto } from './dto/update-name-favorite.dto';
import { NameDetail, NameSearchResult } from './name-spark.types';

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
    // INTERVIEW TODO:
    // Apply deterministic filtering and scoring using `gender`, `origins`,
    // and `startingLetter`. Keep the behavior simple, stable, and easy to
    // explain in the README and deep dive.
    void input;

    throw new NotImplementedException(
      'TODO: implement NameSpark search for the assignment.',
    );
  }

  getNameDetail(id: string): NameDetail {
    const name = this.findNameOrThrow(id);

    // INTERVIEW TODO:
    // Return the full detail payload for the selected name.
    throw new NotImplementedException(
      `TODO: implement NameSpark detail retrieval for ${name.id}.`,
    );
  }

  updateFavorite(id: string, input: UpdateNameFavoriteDto): NameDetail {
    const name = this.findNameOrThrow(id);

    // INTERVIEW TODO:
    // Mutate the in-memory favorite state and return the updated detail.
    void input;
    void name;

    throw new NotImplementedException(
      'TODO: implement NameSpark favorite mutation for the assignment.',
    );
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
