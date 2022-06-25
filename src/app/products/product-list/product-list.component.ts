import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoaderService } from './../../shared/loader.service';
import { ProductListItem } from './../products.model';
import { ProductsService } from './../products.service';
import { LoaderComponent } from '../../shared/loader.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'title', 'price', 'category', 'actions'];
  productsList!: ProductListItem[];

  subs = new Subscription();

  constructor(private productsService: ProductsService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.startLoading(LoaderComponent);
    this.subs.add(
      this.productsService.getProducts(10).subscribe(
        (result: any) => {
          this.productsList = result;
          this.loaderService.stopLoading();
        },
        (error) => {
          console.error(error);
          this.loaderService.stopLoading();
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
