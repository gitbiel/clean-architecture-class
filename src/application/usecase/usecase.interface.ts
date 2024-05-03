export interface UseCase<Input, Output> {
  execute(input: Input): Promise<Output>;
}

type DeleteUseCaseInput = { id: string };

class DeleteUseCaseExample implements UseCase<DeleteUseCaseInput, void> {
  execute(input: DeleteUseCaseInput): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

console.log(new Date());
