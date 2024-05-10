import { ERROR_MESSAGE } from "../../user/error-message.enum";
import { CreateProductUseCase } from "./create-product.usecase";

const MockProductRepository = () => ({
  create: jest.fn().mockResolvedValue({ id: "1" }),
  find: jest.fn(),
  update: jest.fn(),
  list: jest.fn(),
});

describe("CreateProductUsecase", () => {
  it("should create a product", async () => {
    const input = {
      name: "ipad",
      description: "ipad pro 128gb",
      price: 4500,
    };

    const repository = MockProductRepository();

    const useCase = new CreateProductUseCase(repository);
    const output = await useCase.execute(input);

    expect(output.id).toEqual("1");
    expect(repository.create).toHaveBeenCalledWith({
      name: "ipad",
      description: "ipad pro 128gb",
      price: 4500,
    });
  });

  it("should return an error if the price is not a positive number", async () => {
    const input = {
      name: "ipad",
      description: "ipad pro 128gb",
      price: 0,
    };

    const repository = MockProductRepository();
    const useCase = new CreateProductUseCase(repository);

    await expect(useCase.execute(input)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_PRICE
    );
  });

  it("should return an error if the name is invalid", async () => {
    const input = {
      name: "      ",
      description: "ipad pro 128gb",
      price: 4500,
    };

    const repository = MockProductRepository();
    const useCase = new CreateProductUseCase(repository);

    await expect(useCase.execute(input)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_NAME
    );
  });
  it("should return an error if the name is longer than 20 characters", async () => {
    const input = {
      name: "Máquina de Lavar Roupas de Alta Capacidade",
      description: "8kg em perfeito estado",
      price: 5000,
    };

    const repository = MockProductRepository();
    const useCase = new CreateProductUseCase(repository);

    await expect(useCase.execute(input)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_NAME_TOO_LONG
    );
  });
});
