import {ReportModel} from './ReportModel';

export class AgentInfoModel extends ReportModel {

  public agentName = 'Agent';
  public address = 'Adresa';
  public city = 'Oras';
  public state = 'Stat';
  public sendReceiveCapability = 'SEND / RECEIVE';
  public agentPhone = 'Telefon';
  public storeHours = 'Program';

  isDefaultHeader(fieldName: string){
    if (fieldName == this.getFieldName(this.agentName) ||
      fieldName == this.getFieldName(this.address) ||
      fieldName == this.getFieldName(this.city) ||
      fieldName == this.getFieldName(this.sendReceiveCapability) ||
      fieldName == this.getFieldName(this.agentPhone) ||
      fieldName == this.getFieldName(this.storeHours) )
      return true;
    else
      return false;
  }
}
