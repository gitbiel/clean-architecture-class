import { CreateUserUseCase } from "./create-user.usecase";

const MockUserRepository = () => ({
  find: jest.fn(),
  create: jest.fn().mockResolvedValue({ id: "1" }),
  update: jest.fn(),
  list: jest.fn(),
});

describe("CreateUserUseCase", () => {
  it("Deve criar um usuario", async () => {
    const input = {
      fullName: "gabriel mendes",
      email: "biel@gmail.com",
      password: "123456B",
      birthday: "10022005",
    };

    const repository = MockUserRepository();

    const useCase = new CreateUserUseCase(repository);
    jest.spyOn(repository, "create");

    const output = await useCase.execute(input);

    expect(output.id).toEqual("1");
    expect(repository.create).toHaveBeenCalled();
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith({
      fullName: "Gabriel Mendes",
      email: "biel@gmail.com",
      password: "123456B",
      birthday: "10022005",
    });
  });

  it("Deve retornar um erro", async () => {
    const input = {
      fullName: "isaias Mendes",
      email: "isaias@email.com",
      password: "123456",
      birthday: "23081995",
    };

    const repository = MockUserRepository();
    repository.create = jest.fn().mockRejectedValue("Usuário já cadastrado!");
    jest
      .spyOn(repository, "create")
      .mockRejectedValue("Usuário já cadastrado!");

    const useCase = new CreateUserUseCase(repository);

    try {
      await useCase.execute(input);
    } catch (error) {
      expect(error).toBe("Usuário já cadastrado!");
    }
  });
});
