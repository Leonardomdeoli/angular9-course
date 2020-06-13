import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  required = new FormControl('', [Validators.required, Validators.requiredTrue]);

  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private _productService: ProductService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  createProduct(): void {
    this._productService.create(this.product).subscribe(() => {

      this._productService.showMessage("Produto criado").subscribe(() => {
        this._router.navigate(['/products']);
      });
    })
  }

  cancel(): void {
    this._router.navigate(['/products']);
  }

  getErrorMessage() {
    if (this.required.hasError('required')) {
      return 'Você deve inserir um valor';
    }
    
    return '';
  }
}
