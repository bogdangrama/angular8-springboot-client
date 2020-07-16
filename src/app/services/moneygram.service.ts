import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SucursaleService} from './sucursale.service';
import {FeeInfo} from '../models/feeInfo';
import {ProductFieldInfo, ProductFieldInfoContainer} from '../models/productfieldinfo';
import {ReferenceNumberResponse} from '../models/referenceNumberResponse';
import {TransactionReportModel} from '../models/TransactionReportModel';
import {FeeInfoResponse} from '../models/feeInfoResponse';
import {ProductFIeldInfoResponse} from '../models/ProductFIeldInfoResponse';

@Injectable({
  providedIn: 'root'
})
export class MoneyGramService {
  private baseUrl = 'http://localhost:8080/springboot-crud-rest/api/v1/moneygram';

  constructor(private http: HttpClient) { }

  getCountryInfoList(): Observable<any> {
    const url = `${this.baseUrl}` + '/countryInfo';
    return this.http.get(url);
  }

  getClient(): Observable<any> {
    const url = `${this.baseUrl}` + '/client';
    return this.http.get(url);
  }

  // tslint:disable-next-line:max-line-length
  feeLookup(transaction: TransactionReportModel): Observable<any> {// string, currency: string, amountType: string, amount: string): Observable<any> {
    const url = `${this.baseUrl}` + '/feeLookup'; // + receiveCountry  + '&' +  currency + '&' + amountType  + '&' + amount;
    return this.http.post(url, transaction);
  }

  getFieldForProductForFeeInfo(feeInfoResponse: FeeInfoResponse): Observable<any> {
    const url = `${this.baseUrl}` + '/getFieldForProduct';
    return this.http.post(url, feeInfoResponse);
  }

  sendValidation(productFIeldInfoResponse: ProductFIeldInfoResponse): Observable<any> {
    const url = `${this.baseUrl}` + '/sendValidation';
    return this.http.post(url, productFIeldInfoResponse);
  }

  referenceNumberRequest(referenceNumber: string): Observable<any> {
    const url = `${this.baseUrl}` + '/referenceNumber/' + referenceNumber;
    return this.http.get(url);
  }

  getFieldForProductForReferenceNumberResponse(referenceNumberResponse: ReferenceNumberResponse): Observable<any> {
    const url = `${this.baseUrl}` + '/getFieldForProductReceive';
    return this.http.post(url, referenceNumberResponse);
  }

  getTransactions(): Observable<any> {
    const url = `${this.baseUrl}` + '/getTransactions';
    return this.http.post(url, null);
  }

  cityList(receiveCountry: string, receiveState: string, cityPrefix: string): Observable<any> {
    const url = `${this.baseUrl}` + '/cityList/' + receiveCountry + '&' + receiveState + '&' + cityPrefix;
    return this.http.get(url);
  }

  directoryOfAgentsByCity(country: string, city: string, state: string): Observable<any> {
    const url = `${this.baseUrl}` + '/directoryOfAgentsByCity/' + country + '&' + city +  '&' + state;
    return this.http.get(url);
  }

  profile(): Observable<any> {
    const url = `${this.baseUrl}` + '/profile';
    return this.http.get(url);
  }

  getTransactionsWithParams(startdate: string, endDate: string, sucursala: string, cnp: string, fieldName: string, sorting: string): Observable<any> {
    const url = `${this.baseUrl}` + '/getTransactions/' + startdate + '&' + endDate + '&' + sucursala + '&' + cnp + '&' + fieldName + '&' + sorting;
    return this.http.get(url);
  }

  detailLookup(referenceNumber: string): Observable<any> {
    const url = `${this.baseUrl}` + '/detailLookup/' + referenceNumber;
    return this.http.get(url);
  }

  amendTransaction(receiverFirstName: string, receiverMiddleName: string, receiverLastName: string, receiverLastName2): Observable<any> {
    const url = `${this.baseUrl}` + '/amendTransaction/' + receiverFirstName + '&' + receiverMiddleName + '&' + receiverLastName + '&' + receiverLastName2;
    return this.http.get(url);
  }
}
