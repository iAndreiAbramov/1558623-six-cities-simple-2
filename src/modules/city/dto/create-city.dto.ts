import { CityName } from '../../../types/cities.types';
import { IsEnum, IsNumber } from 'class-validator';

export default class CreateCityDto {
  @IsEnum(CityName, { message: '$value is not valid $property' })
  name!: CityName;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;
}
