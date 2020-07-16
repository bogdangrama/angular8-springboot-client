export class ColumnHeader{
  private _fieldName: string;
  private _fieldValue: string;

  private _filter:string = '';
  private _sorting: Sorting = Sorting.ASC;

  private _isActive: boolean;
  private _isTemp: boolean;

  private _isFilterPopupVisible: boolean;
  private _isFilterPopupColumnSelectionVisible: boolean

  constructor(fieldName: string, fieldValue: string, filter: string, sorting: Sorting, isActive: boolean) {
    this._fieldName = fieldName;
    this._fieldValue = fieldValue;
    this._filter = filter;
    this._sorting = sorting;
    this._isActive = isActive;
    this._isTemp = false;
    this._isFilterPopupVisible = false;
    this._isFilterPopupColumnSelectionVisible = false;
  }

  toggleSorting(){
    if(this._sorting == Sorting.NONE)
      this._sorting = Sorting.ASC;
    if(this._sorting == Sorting.ASC)
      this._sorting = Sorting.DESC;
    if(this._sorting == Sorting.DESC)
      this._sorting = Sorting.NONE;
  }

  get fieldName(): string {
    return this._fieldName;
  }

  set fieldName(value: string) {
    this._fieldName = value;
  }

  get fieldValue(): string {
    return this._fieldValue;
  }

  set fieldValue(value: string) {
    this._fieldValue = value;
  }

  get filter(): string {
    return this._filter;
  }

  set filter(value: string) {
    this._filter = value.trim();
  }

  get sorting(): Sorting {
    return this._sorting;
  }

  set sorting(value: Sorting) {
    this._sorting = value;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }

  get isTemp(): boolean {
    return this._isTemp;
  }

  set isTemp(value: boolean) {
    this._isTemp = value;
  }

  get isFilterPopupVisible(): boolean {
    return this._isFilterPopupVisible;
  }

  set isFilterPopupVisible(value: boolean) {
    this._isFilterPopupVisible = value;
  }


  get isFilterPopupColumnSelectionVisible(): boolean {
    return this._isFilterPopupColumnSelectionVisible;
  }

  set isFilterPopupColumnSelectionVisible(value: boolean) {
    this._isFilterPopupColumnSelectionVisible = value;
  }
}

export enum Sorting {
  NONE = 'NONE',
  ASC = 'ASC',
  DESC = 'DESC'
}
