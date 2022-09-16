export interface IMockData {
  titles: string[];
  descriptions: string[];
  cityNames: string[];
  previewImages: string[];
  photos: string[];
  isPremium: string;
  apartmentTypes: string[];
  goods: string[];
  users: Record<string | number | symbol, string>[];
  coordinates: Record<string | number | symbol, string>[];
}
