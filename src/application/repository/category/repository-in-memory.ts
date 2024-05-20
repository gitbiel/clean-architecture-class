import { Category, CategoryRepositoryInterface, CategorytWithId, ListCategoryResponse } from "./repository-interface";
import { randomUUID } from "crypto";

export class ProductRepositoryMemory implements CategoryRepositoryInterface {
  private categories: CategorytWithId[] = [];

  async create(input: Category): Promise<{ id: string }> {
    const id = randomUUID();
    const categoryWithId: CategorytWithId = { id, ...input };
    this.categories.push(categoryWithId);
    return Promise.resolve({ id });
  }

  async find(input: { id: string }): Promise<CategorytWithId> {
    const category = this.categories.find((c) => c.id === input.id);
    if (!category) {
      throw new Error("Categoria não encontrada.");
    }
    return Promise.resolve(category);
  }

  list(): Promise<ListCategoryResponse[]> {
    return Promise.resolve(this.categories)
  }
}
