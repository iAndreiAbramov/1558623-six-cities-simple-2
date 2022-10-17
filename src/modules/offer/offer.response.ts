import { Expose, Type } from 'class-transformer';
import CityResponse from '../city/city.response.js';
import UserResponse from '../user/user.response.js';
import { ResponseGroup } from '../../types/ResponseGroup.js';

export default class OfferResponse {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose({ groups: [ResponseGroup.OfferDetails] })
  description!: string;

  @Expose({ name: 'cityId' })
  @Type(() => CityResponse)
  city!: CityResponse;

  @Expose()
  previewImage!: string;

  @Expose({ groups: [ResponseGroup.OfferDetails] })
  photos!: string[];

  @Expose()
  isPremium!: boolean;

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

  @Expose({ name: 'hostId', groups: [ResponseGroup.OfferDetails] })
  @Type(() => UserResponse)
  host!: UserResponse;

  @Expose({ groups: [ResponseGroup.OfferDetails] })
  coordinates!: string[];

  @Expose()
  createdAt!: string;

  @Expose()
  commentCount!: number;

  @Expose()
  rating!: number;
}
