import {
  ListUserResponse,
  UserWithId,
} from "../../../repository/user/repository-interface";
import { ListUsersUseCase } from "./list-user.usecase";
import { ListUsersUseCaseOutputDTO } from "./list-user.usecase.dto";

const mockUsers: ListUserResponse[] = [
  {
    id: "1",
    fullName: "Gabriel Mendes",
    email: "birisqueta@gmail.com",
    password: "4676",
    birthday: "10022005",
  },
  {
    id: "2",
    fullName: "Isaías Mendes",
    email: "isaias@gmail.com",
    password: "5290",
    birthday: "23081995",
  },
  {
    id: "3",
    fullName: "Raimundo Mendes",
    email: "raiola@gmail.com",
    password: "1234",
    birthday: "07071972",
  },
];

const MockUserRepository = () => ({
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  list: jest.fn().mockResolvedValue(mockUsers),
});

describe("List User UseCase", () => {
  it("should list 3 users", async () => {
    const userRepository = MockUserRepository();

    const usecase = new ListUsersUseCase(userRepository);
    const userOutput: ListUsersUseCaseOutputDTO = await usecase.execute();

    expect(userOutput.length).toEqual(3);
    expect(userOutput[0].id).toEqual("1");
    expect(userOutput[0].fullName).toEqual("Gabriel Mendes");
    expect(userOutput[0].password).toEqual("4676");
    expect(userOutput[0].email).toEqual("birisqueta@gmail.com");

    expect(userOutput[1].id).toEqual("2");
    expect(userOutput[1].fullName).toEqual("Isaías Mendes");
    expect(userOutput[1].password).toEqual("5290");
    expect(userOutput[1].email).toEqual("isaias@gmail.com");

    expect(userOutput[2].id).toEqual("3");
    expect(userOutput[2].fullName).toEqual("Raimundo Mendes");
    expect(userOutput[2].password).toEqual("1234");
    expect(userOutput[2].email).toEqual("raiola@gmail.com");
  });

  it("should list 2 valid users", async () => {
    const userRepository = MockUserRepository();
    const mockValue: UserWithId[] = [
      {
        id: "1",
        fullName: "Lucas Souza",
        email: "lucas@gmail.com",
        password: "4567",
        birthday: "15022000",
      },
      {
        id: "2",
        fullName: "luna",
        email: "luna@gmail.com",
        password: "7894",
        birthday: "21042002",
      },
    ];
    jest.spyOn(userRepository, "list").mockResolvedValue(mockValue);

    const usecase = new ListUsersUseCase(userRepository);

    const userOutput: ListUsersUseCaseOutputDTO = await usecase.execute();

    expect(userOutput.length).toEqual(2);
    expect(userOutput[0].id).toEqual("1");
    expect(userOutput[0].fullName).toEqual("Lucas Souza");
    expect(userOutput[0].email).toEqual("lucas@gmail.com");
    expect(userOutput[0].password).toEqual("4567");
    expect(userOutput[0].birthday).toEqual("15022000");

    expect(userOutput[1].id).toEqual("2");
    expect(userOutput[1].fullName).toEqual("Luna");
    expect(userOutput[1].email).toEqual("luna@gmail.com");
    expect(userOutput[1].password).toEqual("7894");
    expect(userOutput[1].birthday).toEqual("21042002");
  });

  it("object should contain", async () => {
    const userRepository = MockUserRepository();

    const usecase = new ListUsersUseCase(userRepository);
    const userOutput = await usecase.execute();

    expect(userOutput[2]).toEqual(
      expect.objectContaining({
        fullName: "Raimundo Mendes",
        id: "3",
        email: "raiola@gmail.com",
        password: "1234",
        birthday: "07071972",
      })
    );
  });

  it("should handle empty list", async () => {
    const userRepository = MockUserRepository();

    const usecase = new ListUsersUseCase(userRepository);

    jest.spyOn(userRepository, "list").mockResolvedValue([]);

    const emptyUserOutput = await usecase.execute();

    expect(emptyUserOutput.length).toEqual(0);
  });
  // fix it: validar esse test
  it("should return error", async () => {
    const userRepository = MockUserRepository();

    const usecase = new ListUsersUseCase(userRepository);
    const userOutput = await usecase.execute();

    expect(userOutput[1]).toEqual(
      expect.objectContaining({
        fullName: "Isaías Mendes",
        id: "2",
        email: "isaias@gmail.com",
        password: "5290",
        birthday: "23081995",
      })
    );
  });

  it("should list 2 users", async () => {
    const userRepository = MockUserRepository();

    const usecase = new ListUsersUseCase(userRepository);
    const userOutput = await usecase.execute(); // 2

    jest.spyOn(userRepository, "list").mockResolvedValue([1, 2, 3, 4]);

    const userOutput2 = await usecase.execute(); // 4

    expect(userOutput.length).toEqual(3);
    expect(userOutput2.length).toEqual(4);
    expect(userRepository.list).toHaveBeenCalled();
    expect(userRepository.list).toHaveBeenCalledTimes(2);
  });

  it("should return the full name with the first letter capitalized", async () => {
    const userRepository = MockUserRepository();
    const mockValue: UserWithId[] = [
      {
        id: "1",
        fullName: "joão da silva",
        email: "joao@gmail.com",
        password: "1234",
        birthday: "01011990",
      },
    ];
    jest.spyOn(userRepository, "list").mockResolvedValue(mockValue);

    const usecase = new ListUsersUseCase(userRepository);
    const userOutput: ListUsersUseCaseOutputDTO = await usecase.execute();

    expect(userOutput.length).toEqual(1);
    expect(userOutput[0].fullName).toEqual("João Da Silva");
  });
});
