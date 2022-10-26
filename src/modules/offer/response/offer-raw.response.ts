import { Expose, Type } from 'class-transformer';
import CityResponse from '../../city/city.response.js';
import { ResponseGroup } from '../../../types/ResponseGroup.js';

export default class OfferBasicResponse {
  @Expose({ groups: [ResponseGroup.OfferBasic] })
  id!: string;

  @Expose({ groups: [ResponseGroup.OfferBasic] })
  title!: string;

  @Expose({ name: 'cityId' })
  @Type(() => CityResponse)
  city!: CityResponse;

  @Expose({ groups: [ResponseGroup.OfferBasic] })
  previewImage!: string;

  @Expose({ groups: [ResponseGroup.OfferBasic] })
  isPremium!: boolean;

  @Expose({ groups: [ResponseGroup.OfferBasic] })
  type!: string;

  @Expose({ groups: [ResponseGroup.OfferBasic] })
  price!: number;

  @Expose({ groups: [ResponseGroup.OfferBasic] })
  createdAt!: string;

  @Expose({ groups: [ResponseGroup.OfferBasic] })
  commentCount!: number;

  @Expose({ groups: [ResponseGroup.OfferBasic] })
  rating!: number;
}
