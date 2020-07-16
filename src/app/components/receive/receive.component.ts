import {Component, ElementRef, OnInit, ViewChild, Input, Output} from '@angular/core';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {FeeLookup} from '../../models/feeLookup';
import {FeeInfo} from '../../models/feeInfo';
import {MoneyGramService} from '../../services/moneygram.service';
import {CountryInfo} from '../../models/countryInfo';
import {Sucursala} from '../../models/sucursala';
import {ProductFieldInfo, ProductFieldInfoContainer} from '../../models/productfieldinfo';
import {SendValidationWrapper} from '../../models/sendvalidationwrapper';
import {ReferenceNumberResponse} from '../../models/referenceNumberResponse';
import {Renderer} from '@angular/compiler-cli/ngcc/src/rendering/renderer';
import {Client} from '../../models/client';
import {SucursaleService} from '../../services/sucursale.service';

declare var $;

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})
export class ReceiveComponent implements OnInit {
  @ViewChild('referenceNumberModal') referenceNumberModal: ElementRef;
  @ViewChild('finalizareTranzactieModal') finalizareTranzactieModal: ElementRef;
  @ViewChild('referenceNumberInput', {static: false}) referenceNumberInput: ElementRef;

  AfiseazaPas1: boolean = true;
  AfiseazaPas2: boolean = false;
  AfiseazaPas3: boolean = false;
  hiddenPrintableReceiptDiv: boolean = true;
  afiseazaCampuriOptionale: boolean = false;
  referenceNumber: string;
  referenceNumberResponse: ReferenceNumberResponse;
  productFieldInfoList: ProductFieldInfo[];
  sendValidationWrapper: SendValidationWrapper;
  client: Client;

  constructor(private router: Router, private moneyGramService: MoneyGramService) {}

  ngOnInit() {

    this.referenceNumberResponse = new ReferenceNumberResponse();
    this.client = new Client();

    setTimeout(() => {
      $(this.referenceNumberModal.nativeElement).modal('show');
    }, 200);

    setTimeout(() => {
      this.referenceNumberInput.nativeElement.focus();
    }, 200);

    this.moneyGramService.getClient()
      .subscribe(results => {
          const resultsReconverted = JSON.parse(JSON.stringify(results));
          this.client = resultsReconverted;
        },
        error => {
        });
  }

  referenceNumberRequest() {
    $(this.referenceNumberModal.nativeElement).modal('show');

    this.moneyGramService.referenceNumberRequest(this.referenceNumber)
      .subscribe(results => {
          this.referenceNumberResponse = results;
          $(this.referenceNumberModal.nativeElement).modal('hide');
        },
        error => {
          $(this.referenceNumberModal.nativeElement).modal('show');
        });
  }

  TreceLaPasul2() {
    this.moneyGramService.getFieldForProductForReferenceNumberResponse(this.referenceNumberResponse)
      .subscribe(results => {
          const resultsReconverted = JSON.parse(JSON.stringify(results));
          this.productFieldInfoList = resultsReconverted;
          console.log(this.productFieldInfoList);

          this.AfiseazaPas1 = false;
          this.AfiseazaPas2 = true;
        },
        error => {
        });
  }

  InapoiLaPasul1() {
    this.AfiseazaPas1 = true;
    this.AfiseazaPas2 = false;
  }

  get visibleProductInfos() {
    return this.productFieldInfoList.filter( x => (x.visibility === 'REQ' || x.visibility === 'OPT')
      &&
      (
        /*||*/ x.xmlTag.toUpperCase() === ('DeliveryOptDisplayName').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('REFERENCENUMBER').toUpperCase()
        || x.xmlTag.toUpperCase() === ('PIN').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('RECEIVECURRENCY').toUpperCase()
        || x.xmlTag.toUpperCase() === ('AGENTCHECKNUMBER').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('AGENTCHECKTYPE').toUpperCase() ||
        //x.xmlTag.toUpperCase() === ('RECEIVEAMOUNT').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CUSTOMERCHECKNUMBER').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CUSTOMERCHECKTYPE').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CUSTOMERCHECKAMOUNT').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('PCTERMINALNUMBER').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('AGENTUSERECEIVEDATA').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('BILLERACCOUNTNUMBER').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('OTHERPAYOUTTYPE').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('OTHERPAYOUTAMOUNT').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CARDEXPIRATIONMONTH').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CARDEXPIRATIONYEAR').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CARDSWIPED').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('AGENTCONSUMERID').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('AGENTTRANSACTIONID').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('timeToLive').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('RECEIVEPURPOSEOFTRANSACTION').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('ReasonForTransfer').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('relationshipToSender').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('senderIntendedUseOfMGIServices').toUpperCase()
      )
    );
  }

  get visibleReqProductInfos() {
    return this.productFieldInfoList.filter( x => (x.visibility === 'REQ')
      &&
      (
        /*||*/ x.xmlTag.toUpperCase() === ('DeliveryOptDisplayName').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('REFERENCENUMBER').toUpperCase()
        || x.xmlTag.toUpperCase() === ('PIN').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('RECEIVECURRENCY').toUpperCase()
        || x.xmlTag.toUpperCase() === ('AGENTCHECKNUMBER').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('AGENTCHECKTYPE').toUpperCase() ||
        //x.xmlTag.toUpperCase() === ('RECEIVEAMOUNT').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CUSTOMERCHECKNUMBER').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CUSTOMERCHECKTYPE').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CUSTOMERCHECKAMOUNT').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('PCTERMINALNUMBER').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('AGENTUSERECEIVEDATA').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('BILLERACCOUNTNUMBER').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('OTHERPAYOUTTYPE').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('OTHERPAYOUTAMOUNT').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CARDEXPIRATIONMONTH').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CARDEXPIRATIONYEAR').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CARDSWIPED').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('AGENTCONSUMERID').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('AGENTTRANSACTIONID').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('timeToLive').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('RECEIVEPURPOSEOFTRANSACTION').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('ReasonForTransfer').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('relationshipToSender').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('senderIntendedUseOfMGIServices').toUpperCase()
      )
    );
  }

  get visibleOptProductInfos() {
    return this.productFieldInfoList.filter( x => (x.visibility === 'OPT')
      &&
      (
        /*||*/ x.xmlTag.toUpperCase() === ('DeliveryOptDisplayName').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('REFERENCENUMBER').toUpperCase()
        || x.xmlTag.toUpperCase() === ('PIN').toUpperCase()
        //|| x.xmlTag.toUpperCase() === ('RECEIVECURRENCY').toUpperCase()
        || x.xmlTag.toUpperCase() === ('AGENTCHECKNUMBER').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('AGENTCHECKTYPE').toUpperCase() ||
        //x.xmlTag.toUpperCase() === ('RECEIVEAMOUNT').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CUSTOMERCHECKNUMBER').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CUSTOMERCHECKTYPE').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CUSTOMERCHECKAMOUNT').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('PCTERMINALNUMBER').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('AGENTUSERECEIVEDATA').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('BILLERACCOUNTNUMBER').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('OTHERPAYOUTTYPE').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('OTHERPAYOUTAMOUNT').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CARDEXPIRATIONMONTH').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CARDEXPIRATIONYEAR').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('CARDSWIPED').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('AGENTCONSUMERID').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('AGENTTRANSACTIONID').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('timeToLive').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('RECEIVEPURPOSEOFTRANSACTION').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('ReasonForTransfer').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('relationshipToSender').toUpperCase() ||
        x.xmlTag.toUpperCase() === ('senderIntendedUseOfMGIServices').toUpperCase()
      )
    );
  }

  sortProductFieldInfoListBy(prop: string) {
    return this.visibleProductInfos.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  TreceLaPasul3() {
    this.AfiseazaPas1 = false;
    this.AfiseazaPas2 = false;
    this.AfiseazaPas3 = true;
  }

  TiparesteDocument() {
    setTimeout(() => {
      $(this.finalizareTranzactieModal.nativeElement).modal('show');
    }, 200);

    this.hiddenPrintableReceiptDiv = false;
    const printContent = document.getElementById("hiddenPrintableReceiptDiv");
    let innerHTML = printContent.innerHTML;
    this.hiddenPrintableReceiptDiv = true;
    const WindowPrt = window.open('', '', 'menubar=yes,resizable=yes,scrollbars=yes,width=900,height=600');
    WindowPrt.document.write(innerHTML);
    setTimeout(function() { // wait until all resources loaded
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    }, 450);
  }

  sortRequiredProductFieldInfoListBy(prop: string) {
    return this.visibleReqProductInfos.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  sortOptionalProductFieldInfoListBy(prop: string) {
    return this.visibleOptProductInfos.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  getTranslationDictionary() {
    let dictionary = new Map<string, string>();

    dictionary.set("receiverFirstName", "Prenume primitor");
    dictionary.set("receiverLastName", "Nume primitor");
    dictionary.set("Purpose of Transaction", "Scopul tranzactiei");
    dictionary.set("Business Expense", "Cheltuiala de afaceri");
    dictionary.set("Relationship to Sender", "Legatura cu transmitatorul");

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

  AfiseazaCampuriOptionale() {
    this.afiseazaCampuriOptionale = !this.afiseazaCampuriOptionale;
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

  setReference(reference: string) {
    this.referenceNumber = reference;
  }
}
