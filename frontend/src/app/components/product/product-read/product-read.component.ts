import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Sort } from '@angular/material/sort';


@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit, AfterViewInit {

  displayedColumns = ['id', 'name', 'price', 'action'];
  products: Product[];

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this._productService.read().subscribe(produtos => this.products = produtos);
  }

  ngAfterViewInit(): void {

  }

  sortData(sort: Sort) {
    const data = this.products.slice();
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.products = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return compare(a[sort.active], b[sort.active], isAsc);
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
