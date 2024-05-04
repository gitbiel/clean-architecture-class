import { randomUUID } from "crypto";
import {
  Product,
  ProductRepositoryInterface,
  ProductWithId,
} from "./product-repository-interface";

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
}
