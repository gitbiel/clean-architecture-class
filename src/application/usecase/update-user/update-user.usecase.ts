import { UserRepositoryInterface } from "../../repository/user/repository-interface";
import { UpdateUserInputDTO, UpdateUserOutputDTO } from "./update-user.dto";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  private hasTwoNames(fullName: string): boolean {
    const names = fullName.trim().split(/\s+/);
    return names.length >= 2 && names.every((name) => name.length >= 3);
  }

  async execute(input: UpdateUserInputDTO): Promise<UpdateUserOutputDTO> {
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

    await this.userRepository.update({
      id: input.id,
      fullName: input.fullName,
      password: input.password,
      email: input.email,
      birthday: input.birthday,
    });

    const output = {
      id: input.id,
      fullName: formattedFullName,
      password: input.password,
      email: input.email,
      birthday: input.birthday,
    };

    return output;
  }
}
