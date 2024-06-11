import { UserRepositoryMemory } from "../../../repository/user/repository-in-memory";
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


describe("List User UseCase integration test", () => {
  it("should list 3 users", async () => {
    const userRepository = new UserRepositoryMemory();
    jest.spyOn(userRepository, 'list')

    await userRepository.create(mockUsers[0])
    await userRepository.create(mockUsers[1])
    await userRepository.create(mockUsers[2])

    const usecase = new ListUsersUseCase(userRepository);
    const userOutput: ListUsersUseCaseOutputDTO = await usecase.execute();

    expect(userOutput.length).toEqual(3);
    expect(userOutput[0].id).toEqual(expect.any(String));
    expect(userOutput[0].fullName).toEqual("Gabriel Mendes");
    expect(userOutput[0].password).toEqual("4676");
    expect(userOutput[0].email).toEqual("birisqueta@gmail.com");

    expect(userOutput[1].id).toEqual(expect.any(String));
    expect(userOutput[1].fullName).toEqual("Isaías Mendes");
    expect(userOutput[1].password).toEqual("5290");
    expect(userOutput[1].email).toEqual("isaias@gmail.com");

    expect(userOutput[2].id).toEqual(expect.any(String));
    expect(userOutput[2].fullName).toEqual("Raimundo Mendes");
    expect(userOutput[2].password).toEqual("1234");
    expect(userOutput[2].email).toEqual("raiola@gmail.com");
  });

  it("should list 2 valid users", async () => {
    const userRepository = new UserRepositoryMemory();
    jest.spyOn(userRepository, 'list')

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
    await userRepository.create(mockValue[0])
    await userRepository.create(mockValue[1])

    const usecase = new ListUsersUseCase(userRepository);

    const userOutput: ListUsersUseCaseOutputDTO = await usecase.execute();

    expect(userOutput.length).toEqual(2);
    expect(userOutput[0].id).toEqual(expect.any(String));
    expect(userOutput[0].fullName).toEqual("Lucas Souza");
    expect(userOutput[0].email).toEqual("lucas@gmail.com");
    expect(userOutput[0].password).toEqual("4567");
    expect(userOutput[0].birthday).toEqual("15022000");

    expect(userOutput[1].id).toEqual(expect.any(String));
    expect(userOutput[1].fullName).toEqual("Luna");
    expect(userOutput[1].email).toEqual("luna@gmail.com");
    expect(userOutput[1].password).toEqual("7894");
    expect(userOutput[1].birthday).toEqual("21042002");
  });

  it("object should contain", async () => {
    const userRepository = new UserRepositoryMemory();
    jest.spyOn(userRepository, 'list')
    await userRepository.create(mockUsers[2])

    const usecase = new ListUsersUseCase(userRepository);
    const userOutput = await usecase.execute();

    expect(userOutput[0]).toEqual(
      expect.objectContaining({
        fullName: "Raimundo Mendes",
        email: "raiola@gmail.com",
        password: "1234",
        birthday: "07071972",
      })
    );
  });

  it("should handle empty list", async () => {
    const userRepository = new UserRepositoryMemory();

    const usecase = new ListUsersUseCase(userRepository);

    const emptyUserOutput = await usecase.execute();

    expect(emptyUserOutput.length).toEqual(0);
  });

});
