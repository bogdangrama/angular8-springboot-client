import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  ElementRef,
  ViewChildren,
  QueryList,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ufe-digits-input',
  templateUrl: './ufe-digits-input.component.html',
  styleUrls: ['./ufe-digits-input.component.scss']
})
export class UfeDigitsInputComponent implements OnInit, AfterViewInit {

  @Input() inputs = 1;
  @Output() callback: EventEmitter<string> = new EventEmitter();
  @Output() callbackInterim: EventEmitter<string> = new EventEmitter();
  @Input() pattern = '^[a-zA-Z0-9]{1}$';
  @ViewChildren('input') childChildren: QueryList<ElementRef>;

  inputGroups: FormGroup;
  formInputs: FormControl[];
  formInputsSubscriptions: any = [];
  inputsHtmlElements: any;
  pinBarcode: string;
  cardBarcode: string;
  invalidBarcode = false;

  constructor(
    private formbuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.generateInputs();
    this.inputGroups = this.formbuilder.group({
      inputControls: this.formbuilder.array(this.formInputs)
    });
  }

  ngAfterViewInit() {
    this.inputsHtmlElements = this.childChildren.toArray();
  }

  /**
   * Keypressed event callback
   * @param keypressedEvent Html keypressedEvent
   * @param index Html input element from the formArray
   */
  onKeyPressed(keypressedEvent: any, index: number) {
    if (keypressedEvent.key === 'Backspace' && !keypressedEvent.inputType) {
      const nextIndex = index - 1;
      if (nextIndex >= 0 && nextIndex < this.inputsHtmlElements.length) {
        this.formInputs[index].disable();
        this.inputsHtmlElements[nextIndex].nativeElement.focus();
      }
    } else if (keypressedEvent.key === 'ArrowRight' || keypressedEvent.key === 'ArrowLeft') {
      const nextIndex = keypressedEvent.key === 'ArrowRight' ? index + 1 : index - 1;
      if (nextIndex >= 0 && nextIndex < this.inputsHtmlElements.length) {
        this.inputsHtmlElements[nextIndex].nativeElement.focus();
      }
    } else if (index > 0 && keypressedEvent.key === 'Enter') {
      this.enterKeyPressed();
    } else {
      const regexPattern = new RegExp(this.pattern);
      if(regexPattern.test(keypressedEvent.key)) {
        const nextIndex = index + 1;
        if (nextIndex < this.inputsHtmlElements.length) {
          this.formInputs[nextIndex].enable();
          this.inputsHtmlElements[nextIndex].nativeElement.focus();
        }
      }
    }
  }

  /**
   * Function called when Enter key is pressed
   */
  enterKeyPressed() {
    const barcodeValue = this.inputGroups.get('inputControls').value.join('');
    this.callback.emit(barcodeValue);
    this.formInputs.forEach((inputControl: FormControl, index) => {
      inputControl.setValue('');
      if (index > 0) {
        inputControl.disable();
      } else {
        this.inputsHtmlElements[index].nativeElement.focus();
      }
    });
  }

  /**
   * Handle the barcode scanning event or multiple characters filled in the first input
   * @param event htmlEvent
   * @param index Html input element from formArray
   */
  inputChanged(event: any, index: any) {
    if (index === 0) {
      const inputValue = this.formInputs[index].value ;
      if (inputValue.length > 1) {
        const values = inputValue.split('');
        values.forEach((value: string, valueIndex: number) => {
          this.formInputs[valueIndex].setValue(value);
          this.formInputs[valueIndex].enable();
          this.inputsHtmlElements[valueIndex].nativeElement.focus();
        })
      }
    }
    const barcodeValue = this.inputGroups.get('inputControls').value.join('');
    this.callbackInterim.emit(barcodeValue);

    if(barcodeValue.length === 17){
      this.callback.emit(barcodeValue);
    }
  }

  /**
   * Generate html form inputs based on the number received as parameter
   */
  generateInputs() {
    this.formInputs = [];
    for(let index=0; index < this.inputs; index++) {
      const formControl = this.formbuilder.control('', [Validators.pattern(this.pattern), Validators.maxLength(1)]);
      if (index > 0) {
        formControl.disable();
      }
      this.formInputs.push(formControl);
    }
  }

  get inputControls() {
    return this.inputGroups.get('inputControls') as FormArray;
  }

}
