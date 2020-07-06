export class InitiateTransaction {
  // receiveCountry, this.feeLookup.currency, this.feeLookup.amountType, this.feeLookup.amount.toString
  receiveCountry: string;
  curr
  
  
  amount: number;
  totalDiscountAmount: number;
  areThereAnySendTaxes: boolean = false;
  totalAmount: number;
  areThereAnyReceiveFees: boolean = false;
  areThereAnyReceiveTaxes: boolean = false;
  deliveryOption: string;
  validExchangeRate: number;
  estimatedExchangeRate: number;
  receiveAgentID: string;
  receiveCountry: string;
  deliveryOptDisplayName: string;
  receiveAgentAbbreviation: string;
  receiveAgentName: string;
  promotionCodeInformation: boolean = false;
  promotionInformation: string;
}
