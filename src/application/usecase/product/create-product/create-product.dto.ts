export interface CreateproductInputDTO {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

export interface CreateproductOutputDTO {
  id: string;
}
