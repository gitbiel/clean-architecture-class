export interface CreateUserInputDTO {
  fullName: string;
  email: string;
  password: string;
  birthday: string;
}

export interface CreateUserOutputDTO {
  id: string;
}

