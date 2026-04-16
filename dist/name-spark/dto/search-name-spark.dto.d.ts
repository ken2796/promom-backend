import { NameGender } from '../../shared/enums/name-gender.enum';
import { NameOrigin } from '../../shared/enums/name-origin.enum';
export declare class SearchNameSparkDto {
    gender?: NameGender;
    origins?: NameOrigin[];
    startingLetter?: string;
    limit?: number;
}
