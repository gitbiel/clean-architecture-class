import { ProductRepositoryInterface } from "../../../repository/product/product-repository-interface";
import { UseCase } from "../../usecase.interface";
import { ERROR_MESSAGE } from "../../user/error-message.enum";
import {
  FindProductInputDTO,
  FindProductOutputDTO,
} from "./find-product.usecase.dto";

export class FindProductUseCase
  implements UseCase<FindProductInputDTO, FindProductOutputDTO  >
{
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: FindProductInputDTO): Promise<FindProductOutputDTO> {
    const resultProduct = await this.productRepository.find({ id: input.id });

    if(!resultProduct) {
      throw new Error(ERROR_MESSAGE.PRODUCT_NOT_FOUND)
    }

    return {
      id: resultProduct.id,
      name: resultProduct.name,
      description: resultProduct.description,
      price: resultProduct.price,
    };
  }
}
