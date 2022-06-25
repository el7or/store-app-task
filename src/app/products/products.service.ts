import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  getProducts(limit: number) {
    return this.http.get(environment.BASE_URL + `products?limit=${limit}`);
  }

  getProductDetails(id: number) {
    return this.http.get(environment.BASE_URL + `products/${id}`);
  }

  postNewProduct(newProduct: Product) {
    return this.http.post(environment.BASE_URL + `products`, newProduct);
  }
}
