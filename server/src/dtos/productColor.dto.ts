export interface CreateProductColorDto {
  colorName: string;
  hex: string;
  totalQuantity: number;
  productId: number;
}

export interface UpdateProductColorDto {
  colorName?: string;
  hex?: string;
  totalQuantity?: number;
  productId?: number;
}
