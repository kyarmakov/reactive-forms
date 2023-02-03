import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor(private http: HttpService) { }

  validatePrice(control: AbstractControl) {
    return control.value < 10 ? { invalidPrice: true } : null;
  }

  validateProductNameNotTaken(control: AbstractControl) {
    return this.http.checkProductNameNotTaken(control.value).pipe(
      map((value: boolean) => {
        return value ? null : { productNameTaken: true };
      })
    )
  }

  validateProductName(control: AbstractControl) {
    const regex = /^Product\s#[0-9]+$/;
    const valid = regex.test(control.value);
    return valid ? null : { invalidProductName: true };
  }
}
