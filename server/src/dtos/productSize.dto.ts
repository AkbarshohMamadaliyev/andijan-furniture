export interface CreateProductSizeDto {
  length: string;
  width: string;
  height: string;
  quantity: number;
  price: number;
  colorId: number;
}

export interface UpdateProductSizeDto {
  length?: string;
  width?: string;
  height?: string;
  quantity?: number;
  price?: number;
  colorId?: number;
}
