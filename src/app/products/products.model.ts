export interface ProductListItem {
  id: number,
  title: string,
  price: number,
  category: string
}

export interface ProductDetails {
  id: number,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string,
  rating: {
    rate: number,
    count: number
  }
}

export class Product {
  title!: string;
  price!: number;
  category!: string;
  description!: string;
  image!: string;
}
