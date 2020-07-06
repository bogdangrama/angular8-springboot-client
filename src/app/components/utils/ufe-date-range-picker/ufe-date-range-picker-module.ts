import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UfeDateRangePickerComponent } from './ufe-date-range-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [UfeDateRangePickerComponent],
  declarations: [UfeDateRangePickerComponent]
})
export class UfeDateRangePickerModule { }
