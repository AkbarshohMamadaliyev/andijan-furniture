export interface CreateProductDto {
  name: string;
  description?: string;
  discount?: number;
  status?: "active" | "inactive";
  categoryId?: number;
  subcategoryId?: number;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  discount?: number;
  status?: "active" | "inactive";
  categoryId?: number;
  subcategoryId?: number;
}
