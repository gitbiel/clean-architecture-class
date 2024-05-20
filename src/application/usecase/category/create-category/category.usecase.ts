import { CategoryRepositoryInterface } from "../../../repository/category/repository-interface";
import { ERROR_MESSAGE } from "../../user/error-message.enum";
import {
  CreateCategoryInputDTO,
  CreateCategoryOutputDTO,
} from "./category.usecase.dto";

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepositoryInterface) {}

  async execute(input: CreateCategoryInputDTO): Promise<CreateCategoryOutputDTO> {
    this.validateCategory(input.name);
    this.categoryAlreadyExist;
    this.validateName(input.name);

    const output = await this.categoryRepository.create({
      name: input.name,
    });

    return output;
  }

  private async validateCategory(name: string): Promise<void> {
    if (!name) {
      throw new Error("Nome da categoria é obrigatório.");
    }
  }

  private async categoryAlreadyExist(name: string): Promise<void> {
    const categoryAlreadyExist = await this.categoryRepository.find({
      id: name,
    });
    if (categoryAlreadyExist) {
      throw new Error("Categoria já existe.");
    }
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error(ERROR_MESSAGE.INVALID_NAME);
    }
  }
}
