import { Expose, Type } from 'class-transformer';
import CityResponse from '../city/city.response.js';
import UserResponse from '../user/user.response.js';

export default class OfferResponse {
  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  @Type(() => CityResponse)
  city!: CityResponse;

  @Expose()
  previewImage!: string;

  @Expose()
  photos!: string[];

  @Expose()
  isPremium!: boolean;

  @Expose()
  rating!: number;

  @Expose()
  type!: string;

  @Expose()
  roomsNumber!: number;

  @Expose()
  guestsNumber!: number;

  @Expose()
  price!: number;

  @Expose()
  goods!: string[];

  @Expose()
  @Type(() => UserResponse)
  host!: UserResponse;

  @Expose()
  coordinates!: string[];
}
