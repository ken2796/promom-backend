import { NameGender } from '../shared/enums/name-gender.enum';
import { NameOrigin } from '../shared/enums/name-origin.enum';
export interface NameSearchResult {
    id: string;
    name: string;
    meaning: string;
    gender: NameGender;
    origin: NameOrigin;
    matchScore: number;
    isFavorite: boolean;
}
export interface NameDetail {
    id: string;
    name: string;
    meaning: string;
    gender: NameGender;
    origin: NameOrigin;
    styles: string[];
    popularity: string;
    insight: string;
    isFavorite: boolean;
}
