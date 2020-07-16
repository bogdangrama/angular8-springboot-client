import {ColumnHeader, Sorting} from './ColumnHeader';

export interface ReportModelInterface {

  getAllHeaders(): any;

  isDefaultHeader(fieldName: string): boolean;

  getAllFieldNames(): string[];

  getAllFieldValues(): string[];

  getFieldName(fieldValue: string): string;

  getFieldValue(fieldName: string): string;
}

export abstract class ReportModel implements ReportModelInterface{

  getAllHeaders() {
    let allHeaders: Array<ColumnHeader> = [];
    for (const fieldName of this.getAllFieldNames()) {
      const header = new ColumnHeader(fieldName, this.getFieldValue(fieldName), '', Sorting.NONE, this.isDefaultHeader(fieldName));
      allHeaders.push(header);
    }
    return allHeaders;
  }

  getAllFieldValues(): string[] {
    let fieldValues: string[] = [];
    Object.keys(this).forEach(
      e => {
        fieldValues.push(this[e])
      }
    );
    return fieldValues;
  }

  abstract isDefaultHeader(fieldName: string): boolean;

  getAllFieldNames() {
    let fieldNames: string[] = [];
    Object.keys(this).forEach(
      e => {
        fieldNames.push(e)
      }
    );
    return fieldNames;
  }

  getFieldName(fieldValue: string) {
    let fieldName = 'defaultFieldName';
    Object.keys(this).forEach(
      e => {
        // console.log(`key=${e}  value=${this[e]}`);
        if (this[e] === fieldValue) {
          fieldName = e;
        }
      }
    );
    return fieldName;
  }

  getFieldValue(fieldName: string) {
    let fieldValue = 'defaultFieldValue';
    Object.keys(this).forEach(
      e => {
        // console.log(`key=${e}  value=${this[e]}`);
        if (e === fieldName) {
          fieldValue = this[e];
        }
      }
    );
    return fieldValue;
  }
}

