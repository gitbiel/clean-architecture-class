import { ProductRepositoryMemory } from "../../../repository/category/repository-in-memory";
import { Category } from "../../../repository/category/repository-interface";

describe("ProductRepositoryMemory", () => {
  let repository: ProductRepositoryMemory;

  beforeEach(() => {
    repository = new ProductRepositoryMemory();
  });

  it("should create a new category", async () => {
    const category: Category = { name: "New category" };
    const { id } = await repository.create(category);

    expect(id).toBeDefined();
    console.log("Isso é o console do category create => " + JSON.stringify(category));
  });

  it("should find a category by ID", async () => {
    const category: Category = { name: "Category found" };
    const { id } = await repository.create(category);

    const foundCategory = await repository.find({ id });

    expect(foundCategory).toBeDefined();
    expect(foundCategory.name).toBe(category.name);
    console.log("Isso é o console do found category => " + JSON.stringify(foundCategory));
  });

  it("deve listar todas as categorias", async () => {
    const category1: Category = { name: "Category 1" };
    const category2: Category = { name: "Category 2" };

    await repository.create(category1);
    await repository.create(category2);

    const categories = await repository.list();

    expect(categories.length).toBe(2);
    expect(categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Category 1" }),
        expect.objectContaining({ name: "Category 2" }),
      ])
    );
    console.log("Isso é o console do categories => " + JSON.stringify(categories));
  });
});
