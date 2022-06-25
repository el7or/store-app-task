import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    data: {
      title: 'Products',
    },
  },
  {
    path: 'add',
    component: AddProductComponent,
    data: {
      title: 'Add Product',
    },
  },
  {
    path: ':id',
    component: ProductDetailsComponent,
    data: {
      title: 'Product Details',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
