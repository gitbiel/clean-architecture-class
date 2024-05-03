import { UserRepositoryInterface } from "../../../repository/user/repository-interface";
import { UseCase } from "../../usecase.interface";
import { FindUserInputDTO, FindUserOutputDTO } from "./find-user.usecase.dto";

export class FindUserUseCase
  implements UseCase<FindUserInputDTO, FindUserOutputDTO>
{
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(input: FindUserInputDTO): Promise<FindUserOutputDTO> {
    const result = await this.userRepository.find({ id: input.id });

    return {
      id: result.id,
      fullName: result.fullName
        ? result.fullName
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "",
      email: result.email,
      birthday: result.birthday,
      password: result.password,
    };
  }
}
