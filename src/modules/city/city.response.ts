import { Expose } from 'class-transformer';

export default class CityResponse {
  @Expose()
  name!: string;

  @Expose()
  latitude!: number;

  @Expose()
  longitude!: number;
}
