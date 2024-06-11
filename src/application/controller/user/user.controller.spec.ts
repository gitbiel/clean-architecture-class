import { UserController } from "./user.controller";
import { CreateUserUseCase } from "../../usecase/user/create-user/create-user.usecase";
import { FindUserUseCase } from "../../usecase/user/find-user/find-user.usecase";
import { ListUsersUseCase } from "../../usecase/user/list-users/list-user.usecase";
import { UpdateUserUseCase } from "../../usecase/user/update-user/update-user.usecase";
import { ERROR_MESSAGE } from "../../usecase/user/error-message.enum";

describe("UserController", () => {
  let userController: UserController;
  let createUserUseCase: CreateUserUseCase;
  let listUsersUseCase: ListUsersUseCase;
  let findUserUseCase: FindUserUseCase;
  let updateUserUseCase: UpdateUserUseCase;

  beforeEach(() => {
    createUserUseCase = {
      execute: jest.fn(),
    } as unknown as CreateUserUseCase;
    listUsersUseCase = {
      execute: jest.fn(),
    } as unknown as ListUsersUseCase;
    findUserUseCase = {
      execute: jest.fn(),
    } as unknown as FindUserUseCase;
    updateUserUseCase = {
      execute: jest.fn(),
    } as unknown as UpdateUserUseCase;

    userController = new UserController(
      createUserUseCase,
      listUsersUseCase,
      findUserUseCase,
      updateUserUseCase
    );
  });

  describe("createUser", () => {
    it("should throw an error if fullName is invalid", async () => {
      const request = {
        body: {
          fullName: "gabriel",
          email: "BIEL@gmail.com",
          password: "123456B",
          birthday: "2005-02-10",
        },
      };
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await expect(userController.createUser(request, reply)).rejects.toThrow(
        ERROR_MESSAGE.INVALID_FULLNAME
      );
    });

    it("should throw an error if email is invalid", async () => {
      const request = {
        body: {
          fullName: "Gabriel Mendes",
          email: "invalid-email",
          password: "Senha123",
          birthday: "2000-01-01",
        },
      };
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await expect(userController.createUser(request, reply)).rejects.toThrow(
        ERROR_MESSAGE.INVALID_EMAIL
      );
    });

    it("should throw an error if password is invalid", async () => {
      const request = {
        body: {
          fullName: "Gabriel Mendes",
          email: "test@example.com",
          password: "123",
          birthday: "2000-01-01",
        },
      };
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await expect(userController.createUser(request, reply)).rejects.toThrow(
        ERROR_MESSAGE.INVALID_PASSWORD
      );
    });

    it("should create a user if input is valid", async () => {
      const request = {
        body: {
          fullName: "Gabriel Mendes",
          email: "test@example.com",
          password: "Pass123",
          birthday: "2000-01-01",
        },
      };
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      (createUserUseCase.execute as jest.Mock).mockResolvedValue({ id: "123" });

      await userController.createUser(request, reply);

      expect(reply.status).toHaveBeenCalledWith(201);
      expect(reply.send).toHaveBeenCalledWith({ id: "123" });
    });
  });

  describe("listUsers", () => {
    it("should list users", async () => {
      const request = {};
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      (listUsersUseCase.execute as jest.Mock).mockResolvedValue([
        { id: "123", fullName: "Gabriel Mendes" },
      ]);

      await userController.listUsers(request, reply);

      expect(reply.status).toHaveBeenCalledWith(200);
      expect(reply.send).toHaveBeenCalledWith([
        { id: "123", fullName: "Gabriel Mendes" },
      ]);
    });
  });

  describe("findUser", () => {
    it("should find a user by id", async () => {
      const request = { params: { id: "123" } };
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      (findUserUseCase.execute as jest.Mock).mockResolvedValue({
        id: "123",
        fullName: "Gabriel Mendes",
      });

      await userController.findUser(request, reply);

      expect(reply.status).toHaveBeenCalledWith(200);
      expect(reply.send).toHaveBeenCalledWith({
        id: "123",
        fullName: "Gabriel Mendes",
      });
    });

    it("should return 404 if user is not found", async () => {
      const request = { params: { id: "123" } };
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      (findUserUseCase.execute as jest.Mock).mockRejectedValue(
        new Error("User not found")
      );

      await userController.findUser(request, reply);

      expect(reply.status).toHaveBeenCalledWith(404);
      expect(reply.send).toHaveBeenCalledWith({ error: "User not found" });
    });
  });

  describe("updateUser", () => {
    it("should throw an error if fullName is invalid", async () => {
      const request = {
        params: { id: "123" },
        body: {
          fullName: "Gabriel",
          email: "test@example.com",
          password: "Pass123",
          birthday: "2000-01-01",
        },
      };
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await expect(userController.updateUser(request, reply)).rejects.toThrow(
        ERROR_MESSAGE.INVALID_FULLNAME
      );
    });

    it("should throw an error if email is invalid", async () => {
      const request = {
        params: { id: "123" },
        body: {
          fullName: "Gabriel Mendes",
          email: "invalid-email",
          password: "Pass123",
          birthday: "2000-01-01",
        },
      };
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await expect(userController.updateUser(request, reply)).rejects.toThrow(
        ERROR_MESSAGE.INVALID_EMAIL
      );
    });

    it("should throw an error if password is invalid", async () => {
      const request = {
        params: { id: "123" },
        body: {
          fullName: "Gabriel Mendes",
          email: "test@example.com",
          password: "123",
          birthday: "2000-01-01",
        },
      };
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await expect(userController.updateUser(request, reply)).rejects.toThrow(
        ERROR_MESSAGE.INVALID_PASSWORD
      );
    });

    it("should update a user if input is valid", async () => {
      const request = {
        params: { id: "123" },
        body: {
          fullName: "Gabriel Mendes",
          email: "test@example.com",
          password: "Pass123",
          birthday: "2000-01-01",
        },
      };
      const reply = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      (updateUserUseCase.execute as jest.Mock).mockResolvedValue({
        id: "123",
        fullName: "Gabriel Mendes",
      });

      await userController.updateUser(request, reply);

      expect(reply.status).toHaveBeenCalledWith(200);
      expect(reply.send).toHaveBeenCalledWith({
        id: "123",
        fullName: "Gabriel Mendes",
      });
    });
  });
});
