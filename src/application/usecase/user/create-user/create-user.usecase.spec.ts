import { ERROR_MESSAGE } from "../error-message.enum";
import { CreateUserUseCase } from "./create-user.usecase";

const MockUserRepository = () => ({
  find: jest.fn(),
  create: jest.fn().mockResolvedValue({ id: "1" }),
  update: jest.fn(),
  list: jest.fn(),
});

describe("CreateUserUseCase", () => {
  it("Deve criar um usuario valido", async () => {
    const input = {
      fullName: "Gabriel Mendes",
      email: "BIEL@gmail.com",
      password: "123456B",
      birthday: "2005-10-02",
    };

    const repository = MockUserRepository();
    jest.spyOn(repository, "create");

    const useCase = new CreateUserUseCase(repository);

    const output = await useCase.execute(input);

    expect(output.id).toEqual("1");
    expect(repository.create).toHaveBeenCalled();
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith({
      fullName: "Gabriel Mendes",
      email: "biel@gmail.com",
      password: "123456B",
      birthday: "2005-10-02",
    });
  });

  it("Deve retornar um erro caso sobrenome esteja faltando no fullName", async () => {
    const input = {
      fullName: "gabriel",
      email: "BIEL@gmail.com",
      password: "123456B",
      birthday: "2005-02-10",
    };

    const repository = MockUserRepository();
    jest.spyOn(repository, "create");

    const useCase = new CreateUserUseCase(repository);
    await expect(useCase.execute(input)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_FULLNAME
    );
  });

  it("Deve retornar um erro se for um email inválido", async () => {
    const input = {
      fullName: "gabriel mendes",
      email: "email@@dominio.com",
      password: "123456B",
      birthday: "10022005",
    };

    const repository = MockUserRepository();
    jest.spyOn(repository, "create");

    const useCase = new CreateUserUseCase(repository);

    await expect(useCase.execute(input)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_EMAIL
    );
  });

  it("Deve retornar um erro caso a senha esteja incorreta", async () => {
    const input = {
      fullName: "gabriel mendes",
      email: "email@dominio.com",
      password: "aaaaaaaa",
      birthday: "2005-02-10",
    };

    const repository = MockUserRepository();
    jest.spyOn(repository, "create");
    const useCase = new CreateUserUseCase(repository);

    await expect(useCase.execute(input)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_PASSWORD
    );
  });

  it("Deve retornar um erro caso o usuário não tenha 18 anos", async () => {
    const input = {
      fullName: "gabriel mendes",
      email: "email@dominio.com",
      password: "123456G",
      birthday: "2007-10-02",
    };

    const repository = MockUserRepository();
    jest.spyOn(repository, "create");
    const useCase = new CreateUserUseCase(repository);

    await expect(useCase.execute(input)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_BIRTHDAY
    );
  });
});
