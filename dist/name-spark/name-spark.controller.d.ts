import { SearchNameSparkDto } from './dto/search-name-spark.dto';
import { UpdateNameFavoriteDto } from './dto/update-name-favorite.dto';
import { NameSparkService } from './name-spark.service';
export declare class NameSparkController {
    private readonly nameSparkService;
    constructor(nameSparkService: NameSparkService);
    search(body: SearchNameSparkDto): import("./name-spark.types").NameSearchResult[];
    getNameDetail(id: string): import("./name-spark.types").NameDetail;
    updateFavorite(id: string, body: UpdateNameFavoriteDto): import("./name-spark.types").NameDetail;
}
