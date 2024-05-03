import { UserRepositoryInterface } from "../../../repository/user/repository-interface";
import { ERROR_MESSAGE } from "../error-message.enum";
import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
} from "./create-user.usecase.dto";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  private hasOnlyLetters(name: string): boolean {
    return /^[a-zA-Z]+$/.test(name);
  }

  private hasSurname(fullName: string): boolean {
    const names = fullName.trim().split(/\s+/);
    return (
      names.length >= 2 &&
      names.every((name) => name.length >= 3 && this.hasOnlyLetters(name))
    );
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

  private isOver18(birthday: string): boolean {
    const birthDate = new Date(birthday);
    const currentDate = new Date();

    // Calcula a diferença em milissegundos
    const diffTime = currentDate.getTime() - birthDate.getTime();
    // Calcula a diferença em anos
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

    return diffYears >= 18;
  }

  async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    if (!this.hasSurname(input.fullName)) {
      throw new Error(ERROR_MESSAGE.INVALID_FULLNAME);
    }

    if (!this.isValidEmail(input.email)) {
      throw new Error(ERROR_MESSAGE.INVALID_EMAIL);
    }

    if (!this.isValidPassword(input.password)) {
      throw new Error(ERROR_MESSAGE.INVALID_PASSWORD);
    }

    if (!this.isOver18(input.birthday)) {
      throw new Error(ERROR_MESSAGE.INVALID_BIRTHDAY);
    }

    const formattedFullName = input.fullName
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const output = this.userRepository.create({
      fullName: formattedFullName,
      email: input.email.toLowerCase(),
      password: input.password,
      birthday: input.birthday,
    });

    return output;
  }
}
