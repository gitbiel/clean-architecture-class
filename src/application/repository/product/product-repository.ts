import { randomUUID } from "crypto";
import {
  Product,
  ProductRepositoryInterface,
  ProductWithId,
} from "./product-repository-interface";
import { FindProductOutputDTO } from "../../usecase/product/find-product/find-product.usecase.dto";

const products: ProductWithId[] = [];

export class ProductRepositoryMemory implements ProductRepositoryInterface {
  async create(input: Product): Promise<{ id: string }> {
    const id = randomUUID();
    products.push({
      id,
      name: input.name,
      description: input.description,
      price: input.price,
    });
    return Promise.resolve({ id });
  }

  async find(input: { id: string }): Promise<FindProductOutputDTO> {
    throw new Error("Method not implemented.");
  }

  async update(input: ProductWithId): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
