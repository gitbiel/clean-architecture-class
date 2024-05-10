import { ProductRepositoryInterface } from "../../../repository/product/product-repository-interface";
import { ERROR_MESSAGE } from "../../user/error-message.enum";
import {
  UpdateProductInputDTO,
  UpdateProductOutputDTO,
} from "./update-product.dto";

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: UpdateProductInputDTO): Promise<UpdateProductOutputDTO> {
    this.validateName(input.name);
    this.validatePrice(input.price);

    await this.productRepository.update({
      id: input.id,
      name: input.name,
      description: input.description,
      price: input.price,
    });

    const output = {
      id: input.id,
      name: input.name,
      description: input.description,
      price: input.price,
    };

    return output;
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error(ERROR_MESSAGE.INVALID_NAME);
    }

    const maxLength = 30;
    if (name.length > maxLength) {
      throw new Error(ERROR_MESSAGE.INVALID_NAME_TOO_LONG);
    }
  }

  private validatePrice(price: number): void {
    if (isNaN(price) || price <= 0) {
      throw new Error(ERROR_MESSAGE.INVALID_PRICE);
    }
  }
}
