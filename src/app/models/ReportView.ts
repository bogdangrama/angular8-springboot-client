import {ColumnHeader, Sorting} from './ColumnHeader';
import {NameValue} from './NameValue';

export class ReportView {

  private _columnHeaders: ColumnHeader[] = [];
  private _reportContent: Array<ColumnHeader[]> = [];

  private _currentFilters: NameValue[] = [];
  private _currentSorting: NameValue = new NameValue('', '');

  sorting = Sorting;

  processFilters(header: ColumnHeader) {

    // parsing current header filtering
    const index = this._currentFilters.findIndex(i => i.name === header.fieldName);
    if (index !== -1) {
      if (header.filter) {
        if (header.isTemp)
          this._currentFilters.splice(index, 1);
        else
          this._currentFilters[index].value = header.filter;
      } else {
        this._currentFilters.splice(index, 1);
      }
    } else {
      if (header.filter)
        this._currentFilters.push(new NameValue(header.fieldName, header.filter));
    }

    // parsing current header sorting
    if (header.sorting != this.sorting.NONE) {
      if (header.isTemp)
        this._currentSorting = new NameValue('', '');
      else
        this._currentSorting = new NameValue(header.fieldName, header.sorting);
    }

    // setting the rest of the headers
    for (let columnHeader of this._columnHeaders) {
      if (columnHeader.isTemp) {
        columnHeader.filter = '';
        columnHeader.sorting = this.sorting.NONE;
        columnHeader.isActive = !columnHeader.isActive;
      }
      if (columnHeader.fieldName != header.fieldName && this._currentSorting.getValue() != '' && this._currentSorting.getName() != columnHeader.fieldName)
        columnHeader.sorting = this.sorting.NONE;
      columnHeader.isTemp = false;
      columnHeader.isFilterPopupVisible = false;
      columnHeader.isFilterPopupColumnSelectionVisible = false;
    }
  }

  get columnHeaders(): ColumnHeader[] {
    return this._columnHeaders;
  }

  get activeColumnHeaders(): ColumnHeader[] {
    return this._columnHeaders.filter(header => {
      return header.isActive;
    });
  }

  set columnHeaders(value: ColumnHeader[]) {
    this._columnHeaders = value;
  }

  get reportContent(): Array<ColumnHeader[]> {
    return this._reportContent;
  }

  set reportContent(value: Array<ColumnHeader[]>) {
    this._reportContent = value;
  }

  get currentFilters(): NameValue[] {
    return this._currentFilters;
  }

  set currentFilters(value: NameValue[]) {
    this._currentFilters = value;
  }

  get currentSorting(): NameValue {
    return this._currentSorting;
  }

  set currentSorting(value: NameValue) {
    this._currentSorting = value;
  }

  public showColumnFilterPopup(header: ColumnHeader) {
    this.hideColumnFilterPopup();
    header.isFilterPopupVisible = true;
  }

  public hideColumnFilterPopup() {
    for (let columnHeader of this._columnHeaders) {
      columnHeader.isFilterPopupVisible = false;
      columnHeader.isFilterPopupColumnSelectionVisible = false;
      columnHeader.isTemp = false;
    }
  }

}
