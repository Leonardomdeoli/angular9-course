import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  required = new FormControl('', [Validators.required, Validators.requiredTrue]);

  product: Product;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this._activatedRoute.snapshot.paramMap.get('id');
    this._productService.readById(id).subscribe(product => this.product = product)
  }


  updateProduct(): void {
    if (this.product.name == null || this.product.name == '') {
      this._productService.showMessage("O nome do produto deve ser informado.", true);
      return;
    }

    if (this.product.price == null || this.product.price < 1) {
      this._productService.showMessage("O preço do produto deve ser informado.", true);
      return;
    }

    this._productService.upate(this.product).subscribe(() => {

      this._productService.showMessage("Produto atualizado com sucesso.");

      this._router.navigate(['/products']);
    });
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
