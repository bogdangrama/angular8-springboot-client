import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {FeeLookup} from '../../models/feeLookup';
import {FeeInfo} from '../../models/feeInfo';
import {MoneyGramService} from '../../services/moneygram.service';
import {CountryInfo} from '../../models/countryInfo';
import {Sucursala} from '../../models/sucursala';
import {ProductFieldInfo} from '../../models/productfieldinfo';

@Component({
  selector: 'app-send',
  templateUrl: './feeLookup.component.html',
  styleUrls: ['./feeLookup.component.css']
})
export class FeeLookupComponent implements OnInit {

  AfiseazaPas1: boolean = true;
  AfiseazaPas2: boolean = false;
  AfiseazaPas3: boolean = false;

  feeLookup: FeeLookup = new FeeLookup();
  feeInfoList: FeeInfo[];
  countryInfoList: CountryInfo[];
  selectedFeeInfo: FeeInfo;
  productFieldInfoList: ProductFieldInfo[];

  constructor(private router: Router, private moneyGramService: MoneyGramService) {}

  ngOnInit() {
    this.selectedFeeInfo = null;

    this.moneyGramService.getCountryInfoList()
      .subscribe(results => {
          const resultsReconverted = JSON.parse(JSON.stringify(results));
          this.countryInfoList = resultsReconverted;
          this.feeLookup.receiveCountry = 'ROU';
          this.feeLookup.currency = 'RON';
          this.feeLookup.amountType = '0';
        },
        error => {
        });
  }

  selectCountry() {

  }

  TreceLaPasul2() {
    this.moneyGramService.feeLookup(this.feeLookup.receiveCountry, this.feeLookup.currency, this.feeLookup.amountType, this.feeLookup.amount.toString())
      .subscribe(results => {
          this.feeInfoList = results;
          console.log(this.feeInfoList);

          this.AfiseazaPas1 = false;
          this.AfiseazaPas2 = true;

          },
        error => {
          this.AfiseazaPas1 = true;
          this.AfiseazaPas2 = false;
        });
  }

  ShowFeeDetails(feeInfo: FeeInfo) {
    this.selectedFeeInfo = feeInfo;
  }

  GetFieldForProduct(feeInfo: FeeInfo) {
    this.selectedFeeInfo = feeInfo;

    let receiveAgentID = 'undefined';

    if (feeInfo.receiveAgentID != null) {
      receiveAgentID = feeInfo.receiveAgentID;
    }

    this.moneyGramService.getFieldForProductForFeeInfo(this.selectedFeeInfo)
      .subscribe(results => {
          const resultsReconverted = JSON.parse(JSON.stringify(results));
          this.productFieldInfoList = resultsReconverted;
          console.log(this.productFieldInfoList);

          this.AfiseazaPas1 = false;
          this.AfiseazaPas2 = false;
          this.AfiseazaPas3 = true;
        },
        error => {
        });
  }

  get visibleProductInfos() {
    return this.productFieldInfoList.filter( x => (x.visibility === 'REQ') &&
                                                  (
                                                    x.xmlTag.toUpperCase() === ('AMOUNT').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('SENDCURRENCY').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVECURRENCY').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('DeliveryOptDisplayName').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERTITLE').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERFIRSTNAME').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERMIDDLENAME').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERLASTNAME').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERLASTNAME2').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('RECEIVERGENDER').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('TESTQUESTION').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('TESTANSWER').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('MESSAGEFIELD1').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('MESSAGEFIELD2').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('OPERATORNAME').toUpperCase()
                                                    || x.xmlTag.toUpperCase() === ('FEEAMOUNT').toUpperCase()
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


                                                  )
                                           );
  }
}
