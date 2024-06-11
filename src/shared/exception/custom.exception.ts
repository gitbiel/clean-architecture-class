type PropsError = {
  message: string;
  statusCode: number;
};

export class CustomError extends Error {
  statusCode: number;
  constructor(props: PropsError) {
    super(props.message);
    this.statusCode = props.statusCode;
    this.name = "CustomError";
  }
}

/*
 Dentro do catch Error faça

if (error instanceof CustomError) {
   Response.send(error.message).statusCode(error.statusCode);
}
*/
