import { UserRepositoryInterface } from "../../../repository/user/repository-interface";
import { UseCase } from "../../usecase.interface";
import { ListUsersUseCaseOutputDTO } from "./list-user.usecase.dto";

export class ListUsersUseCase
  implements UseCase<any, ListUsersUseCaseOutputDTO>
{
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(_input = {}): Promise<ListUsersUseCaseOutputDTO> {
    const result = await this.userRepository.list();

    return result.map((user) => ({
      id: user.id,
      fullName: user.fullName
        ? user.fullName
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "",
      password: `${user.password}`,
      email: user.email,
      birthday: user.birthday,
    }));
  }
}
