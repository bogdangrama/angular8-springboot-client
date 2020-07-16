export class FeeInfo {
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
  sendAmounts: SendAmountInfo;
  receiveAmounts: EstimatedReceiveAmountInfo;
}

export class SendAmountInfo {
  sendAmount: number;
  sendCurrency: string;
  totalSendFees: number;
  totalDiscountAmount: number;
  totalSendTaxes: number;
  totalAmountToCollect: number;
}

export class EstimatedReceiveAmountInfo {
  receiveAmount: number;
  receiveCurrency: string;
  validCurrencyIndicator: boolean;
  payoutCurrency: string;
  totalReceiveFees: number;
  totalReceiveTaxes: number;
  totalReceiveAmount: number;
  receiveFeesAreEstimated: boolean;
  receiveTaxesAreEstimated: boolean;

  //protected List<AmountInfo>
  //detailEstimatedReceiveAmounts;
}
