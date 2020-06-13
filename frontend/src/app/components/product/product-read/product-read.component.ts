import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price'];
  products: Product[] = [];

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this._productService.read().subscribe(produtos => this.products = produtos);
  }
}
