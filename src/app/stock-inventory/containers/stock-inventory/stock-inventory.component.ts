import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomValidationService } from '../../services/custom-validation.service';
import { HttpService } from '../../services/http.service';

import { Product } from '../../models/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Cart } from '../../models/cart.model';



@Component({
  selector: 'app-stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.scss']
})
export class StockInventoryComponent implements OnInit {
  products: Product[];

  productMap: Map<number, Product>;

  form: FormGroup = this.fb.group({
    item: this.fb.group({
      name: [
        '', 
        [Validators.required, this.customValidator.validateProductName], 
        [this.customValidator.validateProductNameNotTaken.bind(this.customValidator)]
      ],
      price: [null, [Validators.required, this.customValidator.validatePrice]]
    }),
    selector: this.fb.group({
      product_id: ["", [Validators.required]],
      quantity: [10]
    }),
    cart: this.fb.array([])
  });


  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService,
    private http: HttpService
  ) {}

  get cart() {
    return this.form.get('cart') as FormArray;
  }


  ngOnInit(): void {

    this.http.getProducts()
      .subscribe({
        next: (products: Product[]) => this.products = products,
        error: (err: HttpErrorResponse) => console.log(err)
      })

    this.http.getCartItems()
      .subscribe({
        next: (cartItems: Cart[]) => {
          cartItems.forEach((cartItem: Cart) => {
            this.cart.push(this.createCart(cartItem));
          })
        },
        error: (err: HttpErrorResponse) => console.log(err)
      })

    this.getProductMap();

  }

  getProductMap(): void {
    const productsObservable = this.http.getProducts();
    productsObservable
      .subscribe((products: Product[]) => {
        const myMap = products.map<[number, Product]>((product: Product) => [product.id, product]);
        this.productMap = new Map<number, Product>(myMap);
        // console.log(this.productMap)
      })
  }

  onCreateProduct(product: Product): void {
    this.http.addProduct(product)
      .subscribe({
        next: (product: Product) => {
          this.http.getProducts()
            .subscribe((products: Product[]) => {
              this.products = products;
              this.getProductMap();
            })
        },
        error: (err: HttpErrorResponse) => console.log(err)
      })
  }

  onCreateCartItem(cartItem: Cart): void {
    this.http.addCartItem(cartItem)
      .subscribe({
        next: (cartItem: Cart) => {
          this.cart.push(this.createCart(cartItem))
        },
        error: (err: HttpErrorResponse) => console.log(err)
      })
  }

  createCart(cartItem: Cart): FormGroup {
    return (
      this.fb.group({
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
        id: cartItem.id
      })
    );
  }

  onRemove({ cartItem, i }): void {
    this.http.removeItemFromCart(cartItem)
      .subscribe({
        next: () => this.cart.removeAt(i),
        error: (err: HttpErrorResponse) => console.log(err)
      })
  }


  onUpdate(cartItem: Cart): void {
    this.http.updateCartItem(cartItem)
      .subscribe({
        next: (cartItem: Cart) => console.log(cartItem),
        error: (err: HttpErrorResponse) => console.log(err)
      })
  }

}
