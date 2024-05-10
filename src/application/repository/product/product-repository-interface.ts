import { FindProductOutputDTO } from "../../usecase/product/find-product/find-product.usecase.dto";

export type Product = {
  name: string;
  description: string;
  price: number;
};

export interface ProductWithId extends Product {
  id: string;
}

export interface ProductRepositoryInterface {
  create(input: Product): Promise<{ id: string }>;
  find(input: { id: string }): Promise<FindProductOutputDTO>;
  update(input: ProductWithId): Promise<void>;
}
