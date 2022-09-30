export interface IMockData {
  titles: string[];
  descriptions: string[];
  cities: Record<string | number | symbol, string>[];
  previewImages: string[];
  photos: string[];
  isPremium: string;
  apartmentTypes: string[];
  goods: string[];
  users: Record<string | number | symbol, string>[];
  coordinates: Record<string | number | symbol, string>[];
}
