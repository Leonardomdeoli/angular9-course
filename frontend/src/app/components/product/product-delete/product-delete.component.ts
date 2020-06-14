import { Product } from './../product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this._activatedRoute.snapshot.paramMap.get('id');
    this._productService.readById(id).subscribe(product => this.product = product);
  }

  removerProduct(): void {
    this._productService.delete(this.product.id).subscribe(() => {

      this._productService.showMessage("Produto removido com sucesso.");

      this._router.navigate(['/products']);
    });
  }

  cancel(): void {
    this._router.navigate(['/products']);
  }

}
