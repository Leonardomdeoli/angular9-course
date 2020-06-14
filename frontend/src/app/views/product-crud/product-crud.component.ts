import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  constructor(
    private _router: Router,
    private _headerService: HeaderService
  ) {
    this._headerService.headerData = {
      title: 'Cadastro de produtos',
      icon: 'storefront',
      routeUrl: '/products'
    }
  }

  ngOnInit(): void {
  }

  navigateProductCreate(): void {
    this._router.navigate(['/products/create']);
  }
}
