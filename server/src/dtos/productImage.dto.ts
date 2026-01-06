export interface CreateProductImageDto {
  url: string;
  colorId: number;
}

export interface UpdateProductImageDto {
  url?: string;
  colorId?: number;
}
