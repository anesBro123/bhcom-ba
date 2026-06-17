export interface StorageFormModel {
  warehouseId: string;
  availableFrom: string;
  availableTo: string;
  spaceM2: number | null;
  description: string;
}

export interface Storage extends StorageFormModel {
  id: string;
  warehouseLabel: string;
  publishedAt: string;
}
