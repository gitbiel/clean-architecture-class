import { CreateUserUseCase } from "../../usecase/user/create-user/create-user.usecase";
import { ERROR_MESSAGE } from "../../usecase/user/error-message.enum";
import { FindUserUseCase } from "../../usecase/user/find-user/find-user.usecase";
import { ListUsersUseCase } from "../../usecase/user/list-users/list-user.usecase";
import { UpdateUserUseCase } from "../../usecase/user/update-user/update-user.usecase";

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private listUsersUseCase: ListUsersUseCase,
    private findUserUseCase: FindUserUseCase,
    private updateUserUseCase: UpdateUserUseCase
  ) {}

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  }

  async createUser(request, reply) {
    const { fullName, email, password, birthday } = request.body;

    if ( !fullName || !email  || !password || !birthday) {
      reply.status(400).send(`Os parametros: fullName, email, password, birthday são obrigatórios`)
    }

    if (!this.hasSurname(fullName)) {
      reply.status(400).send(ERROR_MESSAGE.INVALID_FULLNAME);
    }

    if (!this.isValidEmail(email)) {
      reply.status(400).send(ERROR_MESSAGE.INVALID_EMAIL);
    }

    if (!this.isValidPassword(password)) {
      reply.status(400).send(ERROR_MESSAGE.INVALID_PASSWORD);
    }

    try {
      const output = await this.createUserUseCase.execute({
        fullName,
        email,
        password,
        birthday,
      });
      reply.status(201).send(output);
    } catch (error) {
      reply.status(400).send({ error: error.message });
    }
  }

  async listUsers(_request, reply) {
    try {
      const users = await this.listUsersUseCase.execute();
      reply.status(200).send(users);
    } catch (error) {
      reply.status(400).send({ error: error.message });
    }
  }

  async findUser(request, reply) {
    const { id } = request.params;

    try {
      const output = await this.findUserUseCase.execute({ id });
      reply.status(200).send(output);
    } catch (error) {
      reply.status(404).send({ error: error.message });
    }
  }

  async updateUser(request, reply) {
    const { id } = request.params;
    const { fullName, email, password, birthday } = request.body;

    if (!this.hasSurname(fullName)) {
      throw new Error(ERROR_MESSAGE.INVALID_FULLNAME);
    }

    if (!this.isValidEmail(email)) {
      throw new Error(ERROR_MESSAGE.INVALID_EMAIL);
    }

    if (!this.isValidPassword(password)) {
      throw new Error(ERROR_MESSAGE.INVALID_PASSWORD);
    }

    try {
      const output = await this.updateUserUseCase.execute({
        id,
        fullName,
        email,
        password,
        birthday,
      });
      reply.status(200).send(output);
    } catch (error) {
      reply.status(400).send({ error: error.message });
    }
  }
}
