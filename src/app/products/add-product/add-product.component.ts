import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoaderComponent } from 'src/app/shared/loader.component';
import { Product } from '../products.model';
import { LoaderService } from './../../shared/loader.service';
import { ProductsService } from './../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  newProduct: Product = new Product();

  subs = new Subscription();

  constructor(private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
    private router: Router,
    public location: Location) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      title: [null, Validators.required],
      price: [0, Validators.required],
      category: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
    });
  }

  onSubmit() {
    this.loaderService.startLoading(LoaderComponent);
    Object.assign(this.newProduct, this.productForm.value);
    this.subs.add(
      this.productsService.postNewProduct(this.newProduct).subscribe(
        () => {
          this.loaderService.stopLoading();
          this.snackBar.open('New product added successfully!', ' ', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            panelClass: ['bg-success'],
          });
          this.productForm.reset();
          this.router.navigateByUrl('/products');
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
