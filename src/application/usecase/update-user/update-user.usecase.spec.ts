import { UpdateUserUseCase } from "./update-user.usecase";

const MockUserRepository = () => ({
  find: jest.fn(),
  create: jest.fn().mockResolvedValue({ id: "1" }),
  update: jest.fn(),
  list: jest.fn(),
});

describe("UpdateUserUseCase", () => {
  it("must update the user", async () => {
    const user = {
      id: "1",
      fullName: "gabriel mendes",
      email: "biel@email.com",
      password: "123456",
      birthday: "10022005",
    };

    const repository = MockUserRepository();

    const useCase = new UpdateUserUseCase(repository);
    await useCase.execute(user);

    expect(repository.update).toHaveBeenCalledWith(user);

    const output = await useCase.execute(user);

    expect(output).toEqual({
      id: expect.any(String),
      fullName: "Gabriel Mendes",
      email: "biel@email.com",
      password: "123456",
      birthday: "10022005",
    });
  });
});
