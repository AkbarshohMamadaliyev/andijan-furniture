export interface CreateSubcategoryDto {
  title: string;
  image?: string;
  status?: "active" | "inactive";
  categoryId?: number;
}

export interface UpdateSubcategoryDto {
  title?: string;
  image?: string;
  status?: "active" | "inactive";
  categoryId?: number;
}
