import { CategoryRepositoryInterface } from "../../../repository/category/repository-interface";
import { ListCategoriesUseCaseOutputDTO } from "./list-category.usecase.dto";

export class ListCategoryUseCase {
  constructor(private categoryRepository: CategoryRepositoryInterface) {}
  async execute(_input = {}): Promise<ListCategoriesUseCaseOutputDTO> {
    const result = await this.categoryRepository.list();

    return Promise.resolve(
      result.map((c) => ({
        name: c.name,
        id: c.id,
      }))
    );
  }
}
