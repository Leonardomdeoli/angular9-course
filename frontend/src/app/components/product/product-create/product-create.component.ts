import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { FormControl, Validators } from '@angular/forms';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

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
    if( this.product.name == null || this.product.name == ''){
      this._productService.showMessage("O nome do produto deve ser informado.", true);
      return;
    }

    if(this.product.price == null || this.product.price < 1){
      this._productService.showMessage("O preço do produto deve ser informado.", true);
      return;
    }

    this._productService.create(this.product).subscribe(() => {

      this._productService.showMessage("Produto criado");

      this._router.navigate(['/products']);
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
