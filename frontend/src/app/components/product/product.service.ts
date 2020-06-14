import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "http://localhost:3001/products"

  constructor(private _snackBar: MatSnackBar, private _http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): Observable<MatSnackBarDismiss> {
    return this._snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [isError ? 'msg-error' : 'msg-sucess']
    }).afterDismissed()
  }

  create(product: Product): Observable<Product> {
    return this._http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e, "Ocorreu um erro ao criar novo produto."))
    );
  }

  read(): Observable<Product[]> {
    return this._http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e, "Ocorreu um erro ao carregar lista de produtos."))
    );;
  }

  readById(id: number): Observable<Product> {
    return this._http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e, `Ocorreu um erro ao criar produto com ID ${id}.`))
    );;
  }

  upate(product: Product): Observable<Product> {
    return this._http.put<Product>(`${this.baseUrl}/${product.id}`, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e, "Ocorreu um erro ao atualizar produto."))
    );;
  }

  delete(id: number): Observable<Product> {
    return this._http.delete<Product>(`${this.baseUrl}/${id}`).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e, "Ocorreu um erro ao remover produto."))
    );;
  }

  errorHandler(e: any, msg: string): Observable<any> {
    this.showMessage(msg, true);
    return EMPTY;
  }

}
