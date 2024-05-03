export interface InputUseCaseDTO {}

type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  birthday: string;
};

export type ListUsersUseCaseOutputDTO = User[];
