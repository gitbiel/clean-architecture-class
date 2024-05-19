export interface InputCategoryUseCaseDTO {}

type Category = {
  id: string;
  name: string;
};

export type ListCategoriesUseCaseOutputDTO = Category[];
