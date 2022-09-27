import { CityName } from '../../../types/cities.types';

export default class CreateCityDto {
  name!: CityName;
  latitude!: number;
  longitude!: number;
}
