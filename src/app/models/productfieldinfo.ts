export class ProductFieldInfo {
  xmlTag: string;
  visibility: string;
  fieldLabel: string;
  displayOrder: number;
  fieldCategory: string;
  dynamic: string;
  fieldMax: number;
  fieldMin: number;
  dataType: string;
  enumerated: boolean;
  defaultValue: string;
  validationRegEx: string;
  arrayName: string;
  arrayLength: number;
  exampleFormat: string;
  enumeratedValues: EnumeratedValueInfo[];
  value: string;
  errorMessage: string;
}

export class ProductFieldInfoContainer {
  public productFieldInfoList: ProductFieldInfo[];
}

/*
export class EnumeratedValue {
  value: EnumeratedValueInfo;
}
 */

/*
export class EnumeratedValueInfo {
  enumeratedValueInfo: Tuple[];
}
 */

export class EnumeratedValueInfo {
  value: string;
  label: string;
}
