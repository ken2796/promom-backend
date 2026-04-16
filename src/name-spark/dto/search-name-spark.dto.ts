import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { NameGender } from '../../shared/enums/name-gender.enum';
import { NameOrigin } from '../../shared/enums/name-origin.enum';

export class SearchNameSparkDto {
  @IsOptional()
  @IsEnum(NameGender)
  gender?: NameGender;

  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === 'string' && value.length > 0) {
      return [value];
    }

    return [];
  })
  @IsArray()
  @ArrayMaxSize(4)
  @IsEnum(NameOrigin, { each: true })
  origins?: NameOrigin[];

  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().slice(0, 1).toUpperCase() : value,
  )
  @IsString()
  @Length(1, 1)
  startingLetter?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  limit?: number;
}
