import { ERROR_MESSAGE } from "../../user/error-message.enum";
import { FindProductUseCase } from "./find-product.usecase";
import { FindProductOutputDTO } from "./find-product.usecase.dto";

const MockProductRepository = () => ({
  create: jest.fn(),
  find: jest.fn().mockResolvedValue(product),
  update: jest.fn(),
  list: jest.fn(),
});

const product = {
  id: "1",
  name: "Product",
  description: "Description",
  price: 100,
};

describe("FindProduct UseCase", () => {
  it("should return a product", async () => {
    const input = {
      id: "1",
      name: "Product",
      description: "Description",
      price: 100,
    };

    const repository = MockProductRepository();
    const useCase = new FindProductUseCase(repository);
    const output: FindProductOutputDTO = await useCase.execute(input);

    expect(output).toStrictEqual({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    });
  });
});

it("should return undefined if product is not found", async () => {
  const MockProductRepository = () => ({
    create: jest.fn(),
    find: jest.fn().mockResolvedValue(undefined),
    update: jest.fn(),
    list: jest.fn(),
  });
  const input = {
    id: "1",
    name: "Product",
    description: "Description",
    price: 100,
  };

  const repository = MockProductRepository();
  const useCase = new FindProductUseCase(repository);

  await expect(useCase.execute(input)).rejects.toThrow(
    ERROR_MESSAGE.PRODUCT_NOT_FOUND
  );
});
