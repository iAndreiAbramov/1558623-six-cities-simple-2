import { Expose, Type } from 'class-transformer';
import CityResponse from '../city/city.response.js';
import UserResponse from '../user/user.response.js';
import { ResponseGroup } from '../../types/ResponseGroup.js';

export default class OfferResponse {
  @Expose()
  title!: string;

  @Expose({ groups: [ResponseGroup.OfferDetails] })
  description!: string;

  @Expose()
  @Type(() => CityResponse)
  city!: CityResponse;

  @Expose()
  previewImage!: string;

  @Expose({ groups: [ResponseGroup.OfferDetails] })
  photos!: string[];

  @Expose()
  isPremium!: boolean;

  @Expose()
  rating!: number;

  @Expose()
  type!: string;

  @Expose({ groups: [ResponseGroup.OfferDetails] })
  roomsNumber!: number;

  @Expose({ groups: [ResponseGroup.OfferDetails] })
  guestsNumber!: number;

  @Expose()
  price!: number;

  @Expose({ groups: [ResponseGroup.OfferDetails] })
  goods!: string[];

  @Expose({ groups: [ResponseGroup.OfferDetails] })
  @Type(() => UserResponse)
  host!: UserResponse;

  @Expose({ groups: [ResponseGroup.OfferDetails] })
  coordinates!: string[];
}
