import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {FeeLookup} from '../../models/feeLookup';
import {EstimatedReceiveAmountInfo, FeeInfo, SendAmountInfo} from '../../models/feeInfo';
import {MoneyGramService} from '../../services/moneygram.service';
import {CountryInfo} from '../../models/countryInfo';
import {Sucursala} from '../../models/sucursala';
import {ProductFieldInfo, ProductFieldInfoContainer} from '../../models/productfieldinfo';
import {SendValidationWrapper} from '../../models/sendvalidationwrapper';
import {InitiateTransaction} from '../../models/initiateTransaction';
import {HttpClient} from '@angular/common/http';
import {Client} from '../../models/client';
import {TransactionReportModel} from '../../models/TransactionReportModel';
import {FeeInfoResponse} from '../../models/feeInfoResponse';
import {ProductFIeldInfoResponse} from '../../models/ProductFIeldInfoResponse';

declare var $;

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {
  @ViewChild('marketingModal') marketingModal: ElementRef;
  @ViewChild('finalizareTranzactieModal') finalizareTranzactieModal: ElementRef;

  private baseUrl = 'http://localhost:8080/springboot-crud-rest/api/v1/moneygram';

  AfiseazaPas1: boolean = true;
  AfiseazaPas2: boolean = false;
  AfiseazaPas3: boolean = false;
  AfiseazaPas4: boolean = false;
  hiddenPrintableSendReceiptDiv: boolean = true;
  afiseazaCampuriOptionale: boolean = false;
  adaugaUnCampNouPrenume: boolean = false;
  adaugaUnCampNouNume: boolean = false;
  isBestCommsion: boolean;

  codPromotie: string;
  feeLookup: FeeLookup = new FeeLookup();
  feeInfoList: FeeInfo[];
  moneygramId: string;
  feeInfoResponse: FeeInfoResponse;
  countryInfoList: CountryInfo[];
  selectedCountryInfo: CountryInfo;
  selectedFeeInfo: FeeInfo = new FeeInfo();
  productFieldInfoList: ProductFieldInfo[];
  productFIeldInfoResponse: ProductFIeldInfoResponse = new ProductFIeldInfoResponse();
  receiverFirstNameProductFieldInfo: ProductFieldInfo;
  receiverLastNameProductFieldInfo: ProductFieldInfo;
  accountNumberProductFieldInfo: ProductFieldInfo;
  receiverMiddleNameProductFieldInfo: ProductFieldInfo;
  receiverLastName2ProductFieldInfo: ProductFieldInfo;
  sendValidationWrapper: SendValidationWrapper;
  transactionReportModel: TransactionReportModel = new TransactionReportModel();
  client: Client = new Client();

  constructor(private router: Router, private moneyGramService: MoneyGramService, private http: HttpClient) {}

  ngOnInit() {
    this.codPromotie = '';

    setTimeout(() => {
      $(this.marketingModal.nativeElement).modal('show');
    }, 200);

    this.selectedFeeInfo = new FeeInfo();
    this.selectedFeeInfo.sendAmounts = new SendAmountInfo();
    this.selectedFeeInfo.receiveAmounts = new EstimatedReceiveAmountInfo();

    this.moneyGramService.getClient()
      .subscribe(results => {
          const resultsReconverted = JSON.parse(JSON.stringify(results));
          this.client = resultsReconverted;
        },
        error => {
        });

    this.moneyGramService.getCountryInfoList()
      .subscribe(results => {
          const resultsReconverted = JSON.parse(JSON.stringify(results));
          this.countryInfoList = resultsReconverted;
          this.feeLookup.receiveCountry = 'ROU';
          this.feeLookup.currency = 'RON';
          this.feeLookup.amountType = '0';
          this.selectedCountryInfo = this.countryInfoList.find(f => f.CountryCode === 'ROU');
        },
        error => {
        });
  }

  selectCountry() {

  }

  AdaugaCodPromotie() {
    this.feeLookup.promoCode = this.codPromotie;
    this.codPromotie = '';
  }

  DeleteCodPromotie() {
    this.feeLookup.promoCode = null;
  }

  TreceLaPasul2() {
    this.transactionReportModel.receiveCountry = this.selectedCountryInfo.CountryCode;
    this.transactionReportModel.suma = this.feeLookup.amount.toString();
    this.transactionReportModel.receiveCountry = this.feeLookup.receiveCountry;
    this.transactionReportModel.currency = this.feeLookup.currency;
    this.transactionReportModel.amountType = this.feeLookup.amountType;
    this.transactionReportModel.nume = this.client.lastName;
    this.transactionReportModel.prenume = this.client.firstName;
    this.transactionReportModel.cic = this.client.cic;
    this.transactionReportModel.cnp = this.client.cnp;
    this.transactionReportModel.promoCode = this.feeLookup.promoCode;

    // tslint:disable-next-line:max-line-length
    // this.moneyGramService.feeLookup(this.feeLookup.receiveCountry, this.feeLookup.currency, this.feeLookup.amountType, this.feeLookup.amount.toString())
    this.moneyGramService.feeLookup(this.transactionReportModel)
      .subscribe(results => {
          // this.feeInfoList = results;
          this.feeInfoResponse = results;
          this.feeInfoList = this.feeInfoResponse.feeLookup;
          this.moneygramId = this.feeInfoResponse.mgid;
          console.log(this.feeInfoResponse);

          this.AfiseazaPas1 = false;
          this.AfiseazaPas2 = true;

          },
        error => {
          this.AfiseazaPas1 = true;
          this.AfiseazaPas2 = false;
        });
  }

  TreceLaPasul1() {
    this.AfiseazaPas2 = true;
    this.AfiseazaPas3 = false;
  }

  InapoiLaPasul1() {
    this.AfiseazaPas1 = true;
    this.AfiseazaPas2 = false;
    this.AfiseazaPas3 = false;
  }

  InapoiLaPasul2() {
    this.AfiseazaPas1 = false;
    this.AfiseazaPas2 = true;
    this.AfiseazaPas3 = false;
  }

  ShowFeeDetails(feeInfo: FeeInfo, isFirst: boolean) {
    this.selectedFeeInfo = feeInfo;
    this.isBestCommsion = isFirst;


  }

  GetFieldForProduct(feeInfo: FeeInfo) {
    this.feeInfoResponse.mgid = this.moneygramId;
    // this.feeInfoResponse.feeLookup.push(feeInfo);

    this.selectedFeeInfo = feeInfo;

    let receiveAgentID = 'undefined';

    if (feeInfo.receiveAgentID != null) {
      receiveAgentID = feeInfo.receiveAgentID;
    }

    this.moneyGramService.getFieldForProductForFeeInfo(this.feeInfoResponse)
      .subscribe(results => {
          const resultsReconverted = JSON.parse(JSON.stringify(results));
          this.productFieldInfoList = resultsReconverted;
          console.log(this.productFieldInfoList);

          this.receiverFirstNameProductFieldInfo = this.GetProductFieldInfoList("RECEIVERFIRSTNAME");
          this.accountNumberProductFieldInfo = this.GetProductFieldInfoList("ACCOUNTNUMBER");
          this.receiverLastNameProductFieldInfo = this.GetProductFieldInfoList("RECEIVERLASTNAME");
          this.receiverLastName2ProductFieldInfo = this.GetProductFieldInfoList("RECEIVERLASTNAME2");
          this.receiverMiddleNameProductFieldInfo = this.GetProductFieldInfoList("RECEIVERMIDDLENAME");

          this.AfiseazaPas1 = false;
          this.AfiseazaPas2 = false;
          this.AfiseazaPas3 = true;
        },
        error => {
        });
  }

  FinalizeazaTransferul() {
    console.log(this.productFieldInfoList);

    const productFieldInfoContainer = new ProductFieldInfoContainer();
    productFieldInfoContainer.productFieldInfoList = this.productFieldInfoList;

    this.productFIeldInfoResponse.mgid = this.moneygramId;
    this.productFIeldInfoResponse.productFieldInfoExtensionlist = this.productFieldInfoList;

    this.moneyGramService.sendValidation(this.productFIeldInfoResponse)
      .subscribe(results => {
          const resultsReconverted = JSON.parse(JSON.stringify(results));
          console.log(resultsReconverted);

          this.sendValidationWrapper = resultsReconverted;

          //if (this.sendValidationWrapper.result === 'OK') {
            this.AfiseazaPas1 = false;
            this.AfiseazaPas2 = false;
            this.AfiseazaPas3 = false;
            this.AfiseazaPas4 = true;
          /*
          }
          else {

          }
          */
        },
        error => {
        });
  }

  xmlTagsForCountry(xmlTag: string) {
    if  (xmlTag.toUpperCase() === "RECEIVERCOUNTRY") {
      return true;
    }

    return false;
  }

  get visibleReqProductInfos() {
    return this.productFieldInfoList.filter( x => (x.visibility === 'REQ') &&
                                                  (
                                                    //x.xmlTag.toUpperCase() === ('AMOUNT').toUpperCase()
                                                    //|| x.xmlTag.toUpperCase() === ('SENDCURRENCY').toUpperCase()
                                                    //|| x.xmlTag.toUpperCase() === ('RECEIVECURRENCY').toUpperCase()
                                                    /*||*/ x.xmlTag.toUpperCase() === ('DeliveryOptDisplayName').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERTITLE').toUpperCase()
                                                    //|| x.xmlTag.toUpperCase() === ('RECEIVERFIRSTNAME').toUpperCase()
                                                    //|| x.xmlTag.toUpperCase() === ('RECEIVERMIDDLENAME').toUpperCase()
                                                    //|| x.xmlTag.toUpperCase() === ('RECEIVERLASTNAME').toUpperCase()
                                                    //|| x.xmlTag.toUpperCase() === ('RECEIVERLASTNAME2').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERGENDER').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('TESTQUESTION').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('TESTANSWER').toUpperCase()
                                                    //|| x.xmlTag.toUpperCase() === ('MESSAGEFIELD1').toUpperCase()
                                                    //|| x.xmlTag.toUpperCase() === ('MESSAGEFIELD2').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('OPERATORNAME').toUpperCase()
                                                    //|| x.xmlTag.toUpperCase() === ('FEEAMOUNT').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERADDRESS').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERCITY').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERZIPCODE').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERPHONECOUNTRYCODE').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERPHONE').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVEROCCUPATION').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('PCTERMINALNUMBER').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('AGENTUSESENDDATA').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERCOUNTRY').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERSTATEORPROVINCE').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('DIRECTION1').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('DIRECTION2').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('DIRECTION3').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('CUSTOMERRECEIVENUMBER').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('MARKETINGOPTIN').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('SENDPURPOSEOFTRANSACTION').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('ReasonForTransfer').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('PROOFOFFUNDS').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('SOURCEOFFUNDS').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RELATIONSHIPTORECEIVER').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('PURPOSEOFFUNDS').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERPURPOSEOFFUNDS').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERBANKIDENTIFIER').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('EARTHPORTBANKNAME').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('BANKNAME').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('AccountNumber').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('WPBIC').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RCVRBANKNAMENEW').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('senderIntendedUseOfMGIServices').toUpperCase()
                                                  )
                                           );
  }

  GetProductFieldInfoList(xmlTag: string) {
    return this.productFieldInfoList.find(x => x.xmlTag.toUpperCase() === xmlTag.toUpperCase());
  }

  GetProductFieldInfoListForReceipt(xmlTag: string) {
    try {
      if (this.productFieldInfoList != null) {
        let productFieldInfo = this.productFieldInfoList.find(x => x.xmlTag.toUpperCase() === xmlTag.toUpperCase());
        return productFieldInfo.value;
      } else {
        let productFieldInfo = new ProductFieldInfo();
        return productFieldInfo.value;
      }
    }
    catch (e) {

    }
    return '';
  }

  get visibleOptProductInfos() {
    return this.productFieldInfoList.filter( x => (x.visibility === 'OPT') &&
      (
        //x.xmlTag.toUpperCase() === ('AMOUNT').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('SENDCURRENCY').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('RECEIVECURRENCY').toUpperCase()
        /*||*/ x.xmlTag.toUpperCase() === ('DeliveryOptDisplayName').toUpperCase()
        || x.xmlTag.toUpperCase() === ('RECEIVERTITLE').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('RECEIVERFIRSTNAME').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('RECEIVERMIDDLENAME').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('RECEIVERLASTNAME').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('RECEIVERLASTNAME2').toUpperCase()
        || x.xmlTag.toUpperCase() === ('RECEIVERGENDER').toUpperCase()
        || x.xmlTag.toUpperCase() === ('TESTQUESTION').toUpperCase()
        || x.xmlTag.toUpperCase() === ('TESTANSWER').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('MESSAGEFIELD1').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('MESSAGEFIELD2').toUpperCase()
        || x.xmlTag.toUpperCase() === ('OPERATORNAME').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('FEEAMOUNT').toUpperCase()
        || x.xmlTag.toUpperCase() === ('RECEIVERADDRESS').toUpperCase()
        || x.xmlTag.toUpperCase() === ('RECEIVERCITY').toUpperCase()
        || x.xmlTag.toUpperCase() === ('RECEIVERZIPCODE').toUpperCase()
        || x.xmlTag.toUpperCase() === ('RECEIVERPHONECOUNTRYCODE').toUpperCase()
        || x.xmlTag.toUpperCase() === ('RECEIVERPHONE').toUpperCase()
        || x.xmlTag.toUpperCase() === ('RECEIVEROCCUPATION').toUpperCase()
        || x.xmlTag.toUpperCase() === ('PCTERMINALNUMBER').toUpperCase()
        || x.xmlTag.toUpperCase() === ('AGENTUSESENDDATA').toUpperCase()
        || x.xmlTag.toUpperCase() === ('RECEIVERCOUNTRY').toUpperCase()
        || x.xmlTag.toUpperCase() === ('RECEIVERSTATEORPROVINCE').toUpperCase()
        || x.xmlTag.toUpperCase() === ('DIRECTION1').toUpperCase()
        || x.xmlTag.toUpperCase() === ('DIRECTION2').toUpperCase()
        || x.xmlTag.toUpperCase() === ('DIRECTION3').toUpperCase()
        || x.xmlTag.toUpperCase() === ('CUSTOMERRECEIVENUMBER').toUpperCase()
        || x.xmlTag.toUpperCase() === ('MARKETINGOPTIN').toUpperCase()
        || x.xmlTag.toUpperCase() === ('SENDPURPOSEOFTRANSACTION').toUpperCase()
        || x.xmlTag.toUpperCase() === ('ReasonForTransfer').toUpperCase()
        || x.xmlTag.toUpperCase() === ('PROOFOFFUNDS').toUpperCase()
        || x.xmlTag.toUpperCase() === ('SOURCEOFFUNDS').toUpperCase()
        || x.xmlTag.toUpperCase() === ('RELATIONSHIPTORECEIVER').toUpperCase()
        || x.xmlTag.toUpperCase() === ('PURPOSEOFFUNDS').toUpperCase()
        || x.xmlTag.toUpperCase() === ('RECEIVERPURPOSEOFFUNDS').toUpperCase()
        || x.xmlTag.toUpperCase() === ('RECEIVERBANKIDENTIFIER').toUpperCase()
        || x.xmlTag.toUpperCase() === ('EARTHPORTBANKNAME').toUpperCase()
        || x.xmlTag.toUpperCase() === ('BANKNAME').toUpperCase()
        || x.xmlTag.toUpperCase() === ('AccountNumber').toUpperCase()
        || x.xmlTag.toUpperCase() === ('WPBIC').toUpperCase()
        || x.xmlTag.toUpperCase() === ('RCVRBANKNAMENEW').toUpperCase()
        || x.xmlTag.toUpperCase() === ('senderIntendedUseOfMGIServices').toUpperCase()
      )
    );
  }

  sortRequiredProductFieldInfoListBy(prop: string) {
    return this.visibleReqProductInfos.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  sortOptionalProductFieldInfoListBy(prop: string) {
    return this.visibleOptProductInfos.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  PrintForm() {
    this.hiddenPrintableSendReceiptDiv = false;
    const printContent = document.getElementById("printableSendReceiptDiv");
    let innerHTML = printContent.innerHTML;
    this.hiddenPrintableSendReceiptDiv = true;
    const WindowPrt = window.open('', '', 'menubar=yes,resizable=yes,scrollbars=yes,width=900,height=600');
    WindowPrt.document.write(innerHTML);
    setTimeout(function() { // wait until all resources loaded
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    }, 250);
  }

  TiparesteDocument() {
    setTimeout(() => {
      $(this.finalizareTranzactieModal.nativeElement).modal('show');
    }, 200);

    this.hiddenPrintableSendReceiptDiv = false;
    const printContent = document.getElementById("printableSendReceiptDiv");
    let innerHTML = printContent.innerHTML;
    this.hiddenPrintableSendReceiptDiv = true;
    const WindowPrt = window.open('', '', 'menubar=yes,resizable=yes,scrollbars=yes,width=900,height=600');
    WindowPrt.document.write(innerHTML);
    setTimeout(function() { // wait until all resources loaded
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    }, 450);
  }

  AfiseazaCampuriOptionale() {
    this.afiseazaCampuriOptionale = !this.afiseazaCampuriOptionale;
  }

  AfiseazaCampNouPrenume2() {
    this.adaugaUnCampNouPrenume = !this.adaugaUnCampNouPrenume;
  }

  AfiseazaCampuriNume2() {
    this.adaugaUnCampNouNume = !this.adaugaUnCampNouNume;
  }

  getTranslationDictionary() {
    let dictionary = new Map<string, string>();

    dictionary.set("receiverFirstName", "Prenume primitor");
    dictionary.set("receiverLastName", "Nume primitor");
    dictionary.set("Purpose of Transaction", "Scopul tranzactiei");
    dictionary.set("Business Expense", "Cheltuiala de afaceri");
    dictionary.set("Relationship to receiver", "Legatura cu primitorul");

    return dictionary;
  }

  translate(key: string) {
    let dictionary = this.getTranslationDictionary();
    let translationValue = dictionary.get(key);

    if (translationValue != null) {
      return translationValue;
    }
    else {
      return key;
    }
  }

  ButonSpreEcranulPrincipal() {
    this.router.navigateByUrl('/send');
  }
}
