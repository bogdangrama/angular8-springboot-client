import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-ufe-date-range-picker',
  templateUrl: './ufe-date-range-picker.component.html',
  styleUrls: ['./ufe-date-range-picker.component.scss']
})
export class UfeDateRangePickerComponent implements OnInit {

  @Input() from: moment.Moment;
  @Input() to: moment.Moment;
  @Output() callback: EventEmitter<{from: Date, to: Date}> = new EventEmitter();
  @Input() range = 2;

  hoveredDate: NgbDate;
  fromCalendarDate: NgbDate;
  toCalendarDate: NgbDate;
  dateRangePickerFormGroup: FormGroup;

  constructor(
    private calendar: NgbCalendar,
  ) {}

  ngOnInit() {
    const convertedDateFrom = moment(this.from);
    const convertedDateTo = moment(this.to);

    this.fromCalendarDate = new NgbDate(
      convertedDateFrom.year(),
      convertedDateFrom.month() + 1,
      convertedDateFrom.date()
    );
    this.toCalendarDate = new NgbDate(
      convertedDateTo.year(),
      convertedDateTo.month() + 1,
      convertedDateTo.date()
    );

    this.dateRangePickerFormGroup = new FormGroup({
      fromDateToDate: new FormControl(
        { value: this.formatDisplayedDate(convertedDateFrom, convertedDateTo), disabled: true },[]
      ),
    });
  }

  setMonths(interval: number) {
    switch(interval) {
      case 1:
        this.fromCalendarDate = this.calendar.getPrev(this.calendar.getToday(), 'm', 1);
        this.toCalendarDate = this.calendar.getToday();
        break;
      case 2:
        this.fromCalendarDate = this.calendar.getPrev(this.calendar.getToday(), 'm', 2);
        this.toCalendarDate = this.calendar.getToday();
        break;
      case 3:
        this.fromCalendarDate = this.calendar.getPrev(this.calendar.getToday(), 'm', 3);
        this.toCalendarDate = this.calendar.getToday();
        break;
    }
    const dateFrom = moment(
      new Date(this.fromCalendarDate.year, this.fromCalendarDate.month-1, this.fromCalendarDate.day)
    );
    const dateTo = moment(
      new Date(this.toCalendarDate.year, this.toCalendarDate.month-1, this.toCalendarDate.day)
    );

    this.dateRangePickerFormGroup.controls.fromDateToDate.setValue(this.formatDisplayedDate(dateFrom, dateTo));
    this.callback.emit({from: dateFrom.toDate(), to:dateTo.toDate()});
  }

  formatDisplayedDate(dateFrom: moment.Moment, dateTo: moment.Moment) {
    return dateFrom.format('DD.MM.YYYY') + ' → ' + dateTo.format('DD.MM.YYYY');
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromCalendarDate && !this.toCalendarDate) {
      this.fromCalendarDate = date;
    } else if (this.fromCalendarDate && !this.toCalendarDate && date.after(this.fromCalendarDate)) {
      this.toCalendarDate = date;
    } else {
      this.toCalendarDate = null;
      this.fromCalendarDate = date;
    }

    if (this.fromCalendarDate && this.toCalendarDate) {
      const dateFrom = moment(
        new Date(this.fromCalendarDate.year, this.fromCalendarDate.month - 1, this.fromCalendarDate.day)
      );
      const dateTo = moment(
        new Date(this.toCalendarDate.year, this.toCalendarDate.month - 1, this.toCalendarDate.day)
      );

      this.dateRangePickerFormGroup.controls.fromDateToDate.setValue(this.formatDisplayedDate(dateFrom, dateTo));

      this.callback.emit({from: dateFrom.toDate(), to: dateTo.toDate()});
    }
  }

  isHovered(date: NgbDate) {
    return this.fromCalendarDate &&
      !this.toCalendarDate &&
      this.hoveredDate &&
      date.after(this.fromCalendarDate) &&
      date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromCalendarDate) &&
      date.before(this.toCalendarDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromCalendarDate) ||
      date.equals(this.toCalendarDate) ||
      this.isInside(date) ||
      this.isHovered(date);
  }
}
