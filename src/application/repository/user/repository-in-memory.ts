import { randomUUID } from "crypto";
import {
  FindUserResponse,
  User,
  UserRepositoryInterface,
  UserWithId,
} from "./repository-interface";

const users: UserWithId[] = [];

export class UserRepositoryMemory implements UserRepositoryInterface {
  list(): Promise<UserWithId[]> {
    return Promise.resolve(users);
  }

  update(input: UserWithId): Promise<void> {
    const userIndex = users.findIndex((usr) => usr.id === input.id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }

    users[userIndex] = {
      ...users[userIndex],
      fullName: input.fullName,
      email: input.email,
      birthday: input.birthday,
    };

    return Promise.resolve();
  }

  async create(input: User): Promise<{ id: string }> {
    const id = randomUUID();
    users.push({
      id,
      fullName: input.fullName,
      email: input.email,
      password: input.password,
      birthday: input.birthday,
    });
    return Promise.resolve({ id });
  }

  async find(input: { id: string }): Promise<FindUserResponse> {
    const user = users.find((user) => user.id === input.id);
    if (!user) {
      throw new Error("User not found");
    }
    return Promise.resolve({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      birthday: user.birthday,
      address: "",
      cpf: "123.456.789-01",
    });
  }
}


