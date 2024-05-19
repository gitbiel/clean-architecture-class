import { ListCategoryResponse } from "../../../repository/category/repository-interface";
import { ListCategoryUseCase } from "./list-category.usecase";
import { ListCategoriesUseCaseOutputDTO } from "./list-category.usecase.dto";

const mockCategories: ListCategoryResponse[] = [
  {
    id: "e17783df-c35a-4293-9ab7-964889cbf271",
    name: "eletrodoméstico",
  },
  {
    id: "652f157d-fc48-4946-9839-88bab35827e3",
    name: "Eletrônico",
  },
];

const MockCategoryRepository = () => ({
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  list: jest.fn().mockResolvedValue(mockCategories),
});

describe("ListCategoryUseCase", () => {
  it("Sould list categories", async () => {
    const repository = MockCategoryRepository();
    const usecase = new ListCategoryUseCase(repository);
    const categoryOutput: ListCategoriesUseCaseOutputDTO =
      await usecase.execute();

    expect(categoryOutput.length).toEqual(2);
    expect(categoryOutput[0].id).toEqual(
      "e17783df-c35a-4293-9ab7-964889cbf271"
    );
    expect(categoryOutput[0].name).toEqual("eletrodoméstico");

    expect(categoryOutput[1].id).toEqual(
      "652f157d-fc48-4946-9839-88bab35827e3"
    );
    expect(categoryOutput[1].name).toEqual("Eletrônico");
  });
});
