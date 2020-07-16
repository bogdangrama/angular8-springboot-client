import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UfeDigitsInputComponent } from './ufe-digits-input.component';

describe('UfeDigitsInputComponent', () => {
  let component: UfeDigitsInputComponent;
  let fixture: ComponentFixture<UfeDigitsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UfeDigitsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UfeDigitsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
