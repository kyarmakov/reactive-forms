import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  products: Product[] = [];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    if (this.products.length)
      return of(this.products);

    return this.http.get<Product[]>(`http://localhost:3000/products`).pipe(
      tap((products: Product[]) => this.products = products),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.message))
      })
    )
  }

  getCartItems(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`http://localhost:3000/cart`).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => console.log(err))
      })
    )
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:3000/products`, product).pipe(
      tap((product: Product) => this.products.push(product)),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.message))
      })
    )
  }

  addCartItem(cartItem: Cart): Observable<Cart> {
    return this.http.post<Cart>(`http://localhost:3000/cart`, cartItem).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error(err.message))
      })
    )
  }

  checkProductNameNotTaken(productName: string): Observable<boolean> {
    return this.http.get<Product[]>(`http://localhost:3000/products`).pipe(
      map((products: Product[]) => {
        return products.filter((product: Product) => product.name === productName);
      }),
      map((products: Product[]) => !products.length)
    )
  }
}
