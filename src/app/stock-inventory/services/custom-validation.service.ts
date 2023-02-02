import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }

  validatePrice(control: AbstractControl) {
    return control.value < 10 ? { invalidPrice: true } : null;
  }
}
