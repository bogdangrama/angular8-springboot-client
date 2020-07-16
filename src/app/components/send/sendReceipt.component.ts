import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {FeeLookup} from '../../models/feeLookup';
import {FeeInfo} from '../../models/feeInfo';
import {MoneyGramService} from '../../services/moneygram.service';
import {CountryInfo} from '../../models/countryInfo';
import {Sucursala} from '../../models/sucursala';
import {ProductFieldInfo, ProductFieldInfoContainer} from '../../models/productfieldinfo';
import {SendValidationWrapper} from '../../models/sendvalidationwrapper';

declare var $;

@Component({
  selector: 'app-send-receipt',
  templateUrl: './sendReceipt.component.html',
  styleUrls: ['./sendReceipt.component.css']
})
export class SendReceiptComponent implements OnInit {
  constructor(private router: Router, private moneyGramService: MoneyGramService) {}

  ngOnInit() {
    const printContent = document.getElementById("printableSendReceiptDiv");
    const WindowPrt = window.open('', '', 'menubar=yes,resizable=yes,scrollbars=yes,width=900,height=600');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }

}
