import { ERROR_MESSAGE } from "../error-message.enum";
import { CreateUserUseCase } from "./create-user.usecase";

const MockUserRepository = () => ({
  find: jest.fn(),
  create: jest.fn().mockResolvedValue({ id: "1" }),
  update: jest.fn(),
  list: jest.fn(),
});

describe("CreateUserUseCase", () => {
  it("You should create a valid user", async () => {
    const input = {
      fullName: "Gabriel Mendes",
      email: "BIEL@gmail.com",
      password: "123456B",
      birthday: "2005-10-02",
    };

    const repository = MockUserRepository();

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

  it("Should return an error if last name is missing from fullName", async () => {
    const input = {
      fullName: "gabriel",
      email: "BIEL@gmail.com",
      password: "123456B",
      birthday: "2005-02-10",
    };

    const repository = MockUserRepository();

    const useCase = new CreateUserUseCase(repository);
    await expect(useCase.execute(input)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_FULLNAME
    );
  });

  it("Should return an error if it is an invalid email", async () => {
    const input = {
      fullName: "gabriel mendes",
      email: "email@@dominio.com",
      password: "123456B",
      birthday: "10022005",
    };

    const repository = MockUserRepository();

    const useCase = new CreateUserUseCase(repository);

    await expect(useCase.execute(input)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_EMAIL
    );
  });

  it("Should return an error if the password is incorrect", async () => {
    const input = {
      fullName: "gabriel mendes",
      email: "email@dominio.com",
      password: "aaaaaaaa",
      birthday: "2005-02-10",
    };

    const repository = MockUserRepository();
    const useCase = new CreateUserUseCase(repository);

    await expect(useCase.execute(input)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_PASSWORD
    );
  });

  it("Should return an error if the user is not 18 years old", async () => {
    const input = {
      fullName: "gabriel mendes",
      email: "email@dominio.com",
      password: "123456G",
      birthday: "2007-10-02",
    };

    const repository = MockUserRepository();
    const useCase = new CreateUserUseCase(repository);

    await expect(useCase.execute(input)).rejects.toThrow(
      ERROR_MESSAGE.INVALID_BIRTHDAY
    );
  });
});
