import { randomUUID } from "crypto";
import { CreateCategoryUseCase } from "./category.usecase";
import { ERROR_MESSAGE } from "../../user/error-message.enum";

const MockCategoryRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  list: jest.fn(),
});

describe("CreateCategoryUseCase ", () => {
  it("Should create a valid category", async () => {
    const input = {
      name: "Eletrônico",
    };

    const fixedId = randomUUID();
    const repository = MockCategoryRepository();
    jest.spyOn(repository, "create").mockResolvedValue({ id: fixedId });

    const usecase = new CreateCategoryUseCase(repository);
    const output = await usecase.execute(input);

    expect(repository.create).toHaveBeenCalledWith(input);
    expect(output.id).toEqual(fixedId);
  });

  it("Should return an error if name is invalid", async () => {
    const input = {
      name: "   ",
    };

    const repository = MockCategoryRepository();
    const usecase = new CreateCategoryUseCase(repository);

    await expect(usecase.execute(input)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_NAME
    );
  });
});
