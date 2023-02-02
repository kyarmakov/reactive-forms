import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  products: Product[] = [];

  constructor(private http: HttpClient) { }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:3000/products`, product).pipe(
      tap((product: Product) => this.products.push(product)),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.message))
      })
    )
  }
}
