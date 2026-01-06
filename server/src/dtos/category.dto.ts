export interface CreateCategoryDto {
  title: string;
  image?: string;
  status?: "active" | "inactive";
  order?: number | null;
}

export interface UpdateCategoryDto {
  title?: string;
  image?: string;
  status?: "active" | "inactive";
  order?: number | null;
}
