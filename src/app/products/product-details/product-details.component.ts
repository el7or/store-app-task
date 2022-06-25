import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProductDetails } from './../products.model';
import { ProductsService } from './../products.service';
import { LoaderService } from '../../shared/loader.service';
import { LoaderComponent } from './../../shared/loader.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productId!: number;
  productDetails!: ProductDetails;

  subs = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private loaderService: LoaderService,
    public location: Location) {
    this.activatedRoute.paramMap.subscribe((params) => {
      var id = params.get('id');
      if (id != null) {
        this.productId = +id;
      }
    });
  }

  ngOnInit(): void {
    if (this.productId) {
      this.loaderService.startLoading(LoaderComponent)
      this.subs.add(
        this.productsService.getProductDetails(this.productId).subscribe(
          (result: any) => {
            this.productDetails = result;
            this.loaderService.stopLoading();
          },
          (error) => {
            console.error(error);
            this.loaderService.stopLoading();
          }
        )
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
