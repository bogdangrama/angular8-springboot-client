import {ReportModel} from './ReportModel';

export class TransactionReportModel extends ReportModel {

  public mgid = 'MG ID';
  public nrreferinta = 'Referinta';
  public tip = 'Tip';
  public stare = 'Stare';
  public nume = 'Nume';
  public prenume = 'Prenume';
  public cnp = 'CNP';
  public cic = 'cic';
  public suma = 'suma';
  public comision = 'Comision';
  public currency = 'currency';
  public idSucursala = 'idSucursala';
  public usernameEdit = 'usernameEdit';
  public dataEdit = 'dataEdit';
  public receiveCountry = 'receiveCountry';
  public amountType = 'amountType';
  public promoCode;

  isDefaultHeader(fieldName: string) {
    if (fieldName == this.getFieldName(this.mgid) ||
        fieldName == this.getFieldName(this.nrreferinta) ||
        fieldName == this.getFieldName(this.tip) ||
        fieldName == this.getFieldName(this.stare) ||
        fieldName == this.getFieldName(this.nume) ||
        fieldName == this.getFieldName(this.prenume) ||
        fieldName == this.getFieldName(this.cnp) ||
        fieldName == this.getFieldName(this.suma) ||
        fieldName == this.getFieldName(this.comision) ||
        fieldName == this.getFieldName(this.cic) ||
        fieldName == this.getFieldName(this.currency) ||
        //fieldName == this.getFieldName(this.idSucursala) ||
        //fieldName == this.getFieldName(this.usernameEdit) ||
        //fieldName == this.getFieldName(this.dataEdit) ||
        fieldName == this.getFieldName(this.receiveCountry) //||
        //fieldName == this.getFieldName(this.amountType) ||
        //fieldName == this.getFieldName(this.promoCode)
      )
      return true;
    else
      return false;
  }
}
