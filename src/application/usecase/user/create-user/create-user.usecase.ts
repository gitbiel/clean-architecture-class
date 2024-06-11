import { CustomError } from "../../../../shared/exception/custom.exception";
import { UserRepositoryInterface } from "../../../repository/user/repository-interface";
import { ERROR_MESSAGE } from "../error-message.enum";
import {
  CreateUserInputDTO,
  CreateUserOutputDTO,
} from "./create-user.usecase.dto";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  private isOver18(birthday: string): boolean {
    const birthDate = new Date(birthday);
    const currentDate = new Date();

    const diffTime = currentDate.getTime() - birthDate.getTime();
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

    return diffYears >= 18;
  }

  async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    if (!this.isOver18(input.birthday)) {
      // throw new Error(ERROR_MESSAGE.INVALID_BIRTHDAY);
      throw new CustomError({
        message: ERROR_MESSAGE.INVALID_BIRTHDAY,
        statusCode: 400,
      });
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
