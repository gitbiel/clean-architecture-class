import { ERROR_MESSAGE } from "../../user/error-message.enum";
import { UpdateProductUseCase } from "./update-product.usecase";

const MockProductRepository = () => ({
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  list: jest.fn(),
});

describe("UpdateProductUseCase", () => {
  it("should update the product", async () => {
    const product = {
      id: "1",
      name: "ipad",
      description: "ipad pro 128gb",
      price: 4500,
    };

    const repository = MockProductRepository();
    const usecase = new UpdateProductUseCase(repository);

    await usecase.execute(product);
  });

  it("Should return an erro if name is invalid ", async () => {
    const product = {
      id: "1",
      name: "   ",
      description: "vazio",
      price: 4500,
    };

    const repository = MockProductRepository();
    const usecase = new UpdateProductUseCase(repository);

    await expect(usecase.execute(product)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_NAME
    );
  });

  it("should return an error if the price is not a positive number", async () => {
    const product = {
      id: "1",
      name: "televisão",
      description: "televisão de 32 polegadas",
      price: 0,
    };

    const repository = MockProductRepository();
    const useCase = new UpdateProductUseCase(repository);

    await expect(useCase.execute(product)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_PRICE
    );
  });

  it("should return an error if the name is longer than 20 characters", async () => {
    const product = {
      id: "1",
      name: "exemplo de nome com muitos de caracteres",
      description: "vazio",
      price: 5000,
    };

    const repository = MockProductRepository();
    const useCase = new UpdateProductUseCase(repository);

    await expect(useCase.execute(product)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_NAME_TOO_LONG
    );
  });
});
