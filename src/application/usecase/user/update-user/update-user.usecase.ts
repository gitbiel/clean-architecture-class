import { UserRepositoryInterface } from "../../../repository/user/repository-interface";
import { UpdateUserInputDTO, UpdateUserOutputDTO } from "./update-user.dto";

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  private hasTwoNames(fullName: string): boolean {
    const names = fullName.trim().split(/\s+/);
    return names.length >= 2 && names.every((name) => name.length >= 3);
  }

  private isValidEmail(email: string): boolean {
    // Utilizando uma expressão regular simples para validar o e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  }

  async execute(input: UpdateUserInputDTO): Promise<UpdateUserOutputDTO> {
    if (!this.hasTwoNames(input.fullName)) {
      throw new Error(
        "O nome completo deve conter nome e sobrenome com 3 caracteres no mínimo"
      );
    }

    if (!this.isValidEmail(input.email)) {
      throw new Error("O e-mail fornecido não é válido");
    }

    if (!this.isValidPassword(input.password)) {
      throw new Error(
        "A senha deve ter mais de 6 caracteres e conter pelo menos uma letra e um número"
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
      email: input.email.toLowerCase(),
      birthday: input.birthday,
    };

    return output;
  }
}
