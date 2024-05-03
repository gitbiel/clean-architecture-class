import {
  FindUserResponse,
  UserWithId,
} from "../../../repository/user/repository-interface";
import { FindUserUseCase } from "./find-user.usecase";
import { FindUserOutputDTO } from "./find-user.usecase.dto";

const user: FindUserResponse = {
  id: "1",
  fullName: "Biel",
  email: "biel@email.com",
  password: "123",
  birthday: "19",
  address: "Rua dos bobos numero 0",
  cpf: "12345678911",
};

const MockUserRepository = () => ({
  create: jest.fn(),
  find: jest.fn().mockResolvedValue(user),
  update: jest.fn(),
  list: jest.fn(),
});

describe("FindUser UseCase", () => {
  it.skip("Deve retornar um usuario", async () => {});

  it("Deve retornar um usuario", async () => {
    const input = {
      id: "123",
    };

    const repository = MockUserRepository();

    const useCase = new FindUserUseCase(repository);

    const output: FindUserOutputDTO = await useCase.execute(input);

    expect(output).toStrictEqual({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      birthday: user.birthday,
    });
  });
});
