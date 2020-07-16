import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UfeDigitsInputComponent } from './ufe-digits-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [UfeDigitsInputComponent],
  declarations: [UfeDigitsInputComponent]
})
export class UfeDigitsInputModule { }
