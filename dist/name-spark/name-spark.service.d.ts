import { SearchNameSparkDto } from './dto/search-name-spark.dto';
import { UpdateNameFavoriteDto } from './dto/update-name-favorite.dto';
import { NameDetail, NameSearchResult } from './name-spark.types';
export declare class NameSparkService {
    private readonly names;
    search(input: SearchNameSparkDto): NameSearchResult[];
    getNameDetail(id: string): NameDetail;
    updateFavorite(id: string, input: UpdateNameFavoriteDto): NameDetail;
    private findNameOrThrow;
    protected toSearchResult(name: NameDetail, matchScore: number): NameSearchResult;
    protected toDetail(name: NameDetail): NameDetail;
}
