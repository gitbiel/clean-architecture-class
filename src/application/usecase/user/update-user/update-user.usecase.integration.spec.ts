import { UserRepositoryMemory } from "../../../repository/user/repository-in-memory";
import { UpdateUserUseCase } from "./update-user.usecase";

describe("UpdateUserUseCase integration test", () => {
  it("should update the user", async () => {
    const repository = new UserRepositoryMemory();

    jest.spyOn(repository, 'update')

    const { id: userId } = await repository.create({
      fullName: "gabriel mendes",
      email: "BIEL@email.com",
      password: "123456A",
      birthday: "10022005",
    })

    const inputUser = {
      fullName: "isaias mendes",
      email: "ISAIAS@EMAIL.COM",
      password: "ABC123456",
      birthday: "08-20-1998",
    };

    const useCase = new UpdateUserUseCase(repository);
    const output =  await useCase.execute({
      ...inputUser,
      id: userId,
    });

    expect(repository.update).toHaveBeenCalledWith({
      ...inputUser,
      id: userId,
    });

    expect(repository.update).toHaveBeenCalledTimes(1);

    expect(output).toEqual({
      id: expect.any(String),
      fullName: "Isaias Mendes",
      email: "isaias@email.com",
      password: "ABC123456",
      birthday: "08-20-1998",
    });

    const userUpdated = await repository.find({ id: userId })

    expect({
      id: userUpdated.id,
      fullName: userUpdated.fullName,
      email: userUpdated.email,
      password: userUpdated.password,
      birthday: userUpdated.birthday,
    }).toEqual({
      id: userId,
      fullName: "Isaias Mendes",
      email: "isaias@email.com",
      password: "ABC123456",
      birthday: "08-20-1998",
    });
  });
});
