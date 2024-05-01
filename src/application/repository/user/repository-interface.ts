export type User = {
  fullName: string;
  email: string;
  password: string;
  birthday: string;
};

export interface UserWithId extends User {
  id: string;
}


export interface FindUserResponse {
  id: string;
  fullName: string;
  email: string;
  password: string;
  address: string;
  birthday: string;
  cpf: string;
}

export interface ListUserResponse {
  id: string;
  fullName: string;
  email: string;
  password: string;
  birthday: string;
}

export interface UserRepositoryInterface {
  create(input: User): Promise<{ id: string }>;
  find(input: { id: string }): Promise<FindUserResponse>;
  update(input: UserWithId): Promise<void>;
  list(): Promise<ListUserResponse[]>;
}
