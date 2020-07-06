export class FeeInfo {
  amount: number;
  totalDiscountAmount: number;
  totalSendFees: number;
  totalSendTaxes: number;
  areThereAnySendTaxes: boolean = false;
  sendAmount: number;
  totalAmount: number;
  sendCurrency: string;
  totalReceiveFees: number;
  areThereAnyReceiveFees: boolean = false;
  totalReceiveTaxes: number;
  areThereAnyReceiveTaxes: boolean = false;
  receiveAmount: number;
  totalReceiveAmount: number;
  payoutCurrency: string;
  validCurrencyIndicator: boolean = true;
  validExchangeRate: number;
  estimatedExchangeRate: number;
  receiveCountry: string;
  deliveryOptDisplayName: string;
  receiveAgentAbbreviation: string;
  receiveAgentName: string;
  promotionCodeInformation: boolean = false;
  promotionInformation: string;
}
