import { UpdateUserUseCase } from "./update-user.usecase";

const MockUserRepository = () => ({
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  list: jest.fn(),
});

describe("UpdateUserUseCase", () => {
  it("should update the user", async () => {
    const inputUser = {
      id: "1",
      fullName: "gabriel mendes",
      email: "BIEL@email.com",
      password: "123456A",
      birthday: "10022005",
    };

    const repository = MockUserRepository();

    const useCase = new UpdateUserUseCase(repository);
    await useCase.execute(inputUser);

    expect(repository.update).toHaveBeenCalledWith(inputUser);

    const output = await useCase.execute(inputUser);

    expect(output).toEqual({
      id: expect.any(String),
      fullName: "Gabriel Mendes",
      email: "biel@email.com",
      password: "123456A",
      birthday: "10022005",
    });
  });
});
