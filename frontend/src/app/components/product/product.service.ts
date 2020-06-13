import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "http://localhost:3001/products"

  constructor(private _snackBar: MatSnackBar, private _http: HttpClient) { }

  showMessage(msg: string): Observable<MatSnackBarDismiss> {
    return this._snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    }).afterDismissed()
  }

  create(product: Product): Observable<Product> {
    return this._http.post<Product>(this.baseUrl, product);
  }

  read(): Observable<Product[]> {
    return this._http.get<Product[]>(this.baseUrl);
  }
}
