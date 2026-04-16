import { IsBoolean } from 'class-validator';

export class UpdateNameFavoriteDto {
  @IsBoolean()
  isFavorite!: boolean;
}
