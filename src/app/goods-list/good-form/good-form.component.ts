import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CommunicationService } from 'src/app/shared/communication.service';
import { Good } from 'src/app/shared/good.model';

@Component({
  selector: 'app-good-form',
  templateUrl: './good-form.component.html',
  styleUrls: [
    './good-form.component.css'
  ]
})
export class GoodFormComponent implements OnInit {
  private good: Good = new Good();
  isEditing: boolean = false;
  productForm: FormGroup;
  constructor(private communicationService: CommunicationService) {
    this.communicationService.editGood$.subscribe(good => {
      this.good = good;
      this.productName.setValue(good.name);
      this.productPrice.setValue(good.price);
      this.isEditing = true;
    });
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      productPrice: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {

      let good = {
        id: this.good.id,
        name: this.productForm.controls.productName.value,
        price: this.productForm.controls.productPrice.value
      } as Good;

      if (this.isEditing) {
        this.communicationService.updateGood(good);
        this.isEditing = false;
      }
      else {
        this.communicationService.goodAdded(good);
      }
      
      this.productForm.reset();
    }
  }

  get productName() {
    return this.productForm.controls.productName;
  }

  get productPrice() {
    return this.productForm.controls.productPrice;
  }

  clearForm() {
    this.productForm.reset();
    this.isEditing = false;
  }
}
