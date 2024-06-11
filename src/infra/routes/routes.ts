import { FastifyInstance } from "fastify";
import { UserController } from "../../application/controller/user/user.controller";
import { CreateUserUseCase } from "../../application/usecase/user/create-user/create-user.usecase";
import { UserRepositoryMemory } from "../../application/repository/user/repository-in-memory";
import { UserRepositoryInterface } from "../../application/repository/user/repository-interface";
import { ListUsersUseCase } from "../../application/usecase/user/list-users/list-user.usecase";
import { FindUserUseCase } from "../../application/usecase/user/find-user/find-user.usecase";
import { UpdateUserUseCase } from "../../application/usecase/user/update-user/update-user.usecase";

const userRepository: UserRepositoryInterface = new UserRepositoryMemory();
const createUserUseCase = new CreateUserUseCase(userRepository);
const listUsersUseCase = new ListUsersUseCase(userRepository);
const findUserUseCase = new FindUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);

export default async function userRoutes(app: FastifyInstance) {
  const userController = new UserController(
    createUserUseCase,
    listUsersUseCase,
    findUserUseCase,
    updateUserUseCase
  );

  app.post("/user", async (request, reply) => {
    await userController.createUser(request, reply);
  });

  app.get("/users", async (request, reply) => {
    await userController.listUsers(request, reply);
  });

  app.get("/user/:id", async (request, reply) => {
    await userController.findUser(request, reply);
  });

  app.put("/user/:id", async (request, reply) => {
    await userController.updateUser(request, reply);
  });
}
