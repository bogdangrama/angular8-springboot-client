import {ReportModel} from './ReportModel';

export class TransactionReportModel extends ReportModel {

  public mgid = 'MG ID';
  public nrreferinta = 'Nr referinta';
  public tip = 'Tip';
  public stare = 'Stare';
  public nume = 'Nume';
  public prenume = 'Prenume';
  public cnp = 'CNP';

  isDefaultHeader(fieldName: string){
    if (fieldName == this.getFieldName(this.mgid) ||
        fieldName == this.getFieldName(this.nrreferinta) ||
        fieldName == this.getFieldName(this.tip) ||
        fieldName == this.getFieldName(this.stare) ||
        fieldName == this.getFieldName(this.nume) ||
        fieldName == this.getFieldName(this.prenume) ||
        fieldName == this.getFieldName(this.cnp))
      return true;
    else
      return false;
  }
}
