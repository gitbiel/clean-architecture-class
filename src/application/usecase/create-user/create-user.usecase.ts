import { UserRepositoryInterface } from "../../repository/user/repository-interface";
import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
} from "./create-user.usecase.dto";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  private hasTwoNames(fullName: string): boolean {
    const names = fullName.trim().split(/\s+/);
    return names.length >= 2 && names.every((name) => name.length >= 3);
  }

  async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    if (!this.hasTwoNames(input.fullName)) {
      throw new Error(
        "O nome completo deve conter nome e sobrenome com 3 caracteres no mínimo"
      );
    }
    const formattedFullName = input.fullName
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const output = this.userRepository.create({
      fullName: formattedFullName,
      email: input.email,
      password: input.password,
      birthday: input.birthday,
    });

    return output;
  }
}
