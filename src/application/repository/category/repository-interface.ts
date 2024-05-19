export type Category = {
  name: string;
};

export interface CategorytWithId extends Category {
  id: string;
}

export interface ListCategoryResponse {
  id: string;
  name: string;
}

export interface CategoryRepositoryInterface {
  create(input: Category): Promise<{ id: string }>;
  find(input: { id: string }): Promise<CategorytWithId>;
  list(): Promise<ListCategoryResponse[]>
}
  