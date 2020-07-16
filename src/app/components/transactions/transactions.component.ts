import {
  Component, HostListener,
  OnInit,
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NameValue} from '../../models/NameValue';
import {TransactionReportModel} from '../../models/TransactionReportModel';
import {MoneyGramService} from '../../services/moneygram.service';
import {ColumnHeader} from '../../models/ColumnHeader';
import {ReportView} from '../../models/ReportView';
import {Observable} from 'rxjs';
import {Sucursala} from '../../models/sucursala';
import {SucursaleService} from '../../services/sucursale.service';
import {DetailLookupResponse} from '../../models/detailLookupResponse';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})

export class TransactionsComponent implements OnInit {

  detailLookupResponse: DetailLookupResponse = new DetailLookupResponse();
  sucursaleObservable: Observable<Sucursala[]>;
  sucursale: Sucursala[];
  idSucursala: String = '';
  cnp: String = '';
  datePicker: String;
  globalHeader: ColumnHeader = new ColumnHeader(null, null, null,null,false);

  // Filters and Sorting
  transactionHistory = new TransactionReportModel();
  transactionsHistoryName = 'Istoric Tranzactii';
  windowWidth: any;

  // rapoarte complete
  reportTransactionReportModelHistory: TransactionReportModel[] = [];

  reportView = new ReportView();

  typeOfTransactionReportModel: NameValue[] = [
    new NameValue('mgid',
      this.transactionHistory.mgid),
    new NameValue('nrreferinta',
      this.transactionHistory.nrreferinta),
    new NameValue('tip',
      this.transactionHistory.tip),
    new NameValue('stare',
      this.transactionHistory.stare),
    new NameValue('nume',
      this.transactionHistory.nume),
    new NameValue('prenume',
      this.transactionHistory.prenume),
    new NameValue('cnp',
      this.transactionHistory.cnp),
    new NameValue('suma',
      this.transactionHistory.suma),
    new NameValue('comision',
      this.transactionHistory.comision)
    ];

  dateColumnFilter = '';

  totalPages = 0;
  totalResults = 0;
  totalResultsFooterText: string;

  dataFound: boolean;
  emptyCol = '';
  currentPage = 1;
  batchSize = 30;
  today = new Date;
  oneMonthBack = new Date(this.today.getFullYear() - 2, this.today.getMonth(), this.today.getDate());
  startTime = 'T00:00:01Z';
  endTime = 'T23:59:59Z';
  startDate = this.formatDate(this.oneMonthBack);
  endDate = this.formatDate(this.today);

  constructor(private moneyGramService: MoneyGramService, private activatedRoute: ActivatedRoute, private sucursaleService: SucursaleService) {};

  clearAndNewCall(selectedReportName: string) {
    this.emptyFilters();

    this.reportView.columnHeaders = this.transactionHistory.getAllHeaders();

    this.fetchReportContents();
    this.currentPage = 1;
  }

  buildReportView() {
    this.reportView.reportContent = [];

    for (let reportLine of this.reportTransactionReportModelHistory) {
      let reportLineObject = new TransactionReportModel();
      reportLineObject = Object.assign(reportLineObject, reportLine);
      let columnValues: ColumnHeader[] = [];
      for (let column of this.reportView.activeColumnHeaders) {
        for (let reportColumn of reportLineObject.getAllFieldNames()) {
          if (column.fieldName == reportColumn) {
            columnValues.push(new ColumnHeader(column.fieldName, reportLineObject.getFieldValue(reportColumn), '', this.reportView.sorting.NONE, true));
          }
        }
      }
      this.reportView.reportContent.push(columnValues);
    }

    this.calculateTotalResultsText();
  }

  showFilterPopup(header: ColumnHeader) {
    this.reportView.showColumnFilterPopup(header);
  }

  applyFilterPopup(header: ColumnHeader, sortAsc: boolean, sortDesc: boolean, filter: string) {
    console.log('header filtrat = ' + header.fieldName + ', ' + header.fieldValue + ', ' + header.filter);
    console.log('sortAsc = ' + sortAsc);
    console.log('sortDesc = ' + sortDesc);
    console.log('filter = ' + filter);
    if (sortAsc) {
      header.sorting = this.reportView.sorting.ASC;
    }

    if (sortDesc) {
      header.sorting = this.reportView.sorting.DESC;
    }

    if (filter) {
      header.filter = filter;
    } else if (header.filter)
      header.filter = filter;

    this.globalHeader = header;
    this.reportView.processFilters(header);
    // this.fetchReportContents();
    this.cautaTranzactii();
    this.currentPage = 1;
    this.buildReportView();
  }

  cancelFilterPopup() {
    this.reportView.hideColumnFilterPopup();
  }

  emptyFilters() {
    this.reportView.currentFilters = [];
    this.dateColumnFilter = '';
  }

  filterByDate({from, to}: { from: Date, to: Date }) {
    this.startDate = this.formatDate(from);
    this.endDate = this.formatDate(to);
    this.fetchReportContents();
  }

  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  setColumnForDate(event: any) {
    const selection = event.target.value;

    for (const elem of this.typeOfTransactionReportModel) {
      if (selection === elem.getValue()) {
        this.dateColumnFilter = elem.getName();
      }
    }

    this.fetchReportContents();
  }

  previousPages(difference: number) {
    this.currentPage = this.currentPage - difference;
    this.fetchReportContents();
  }

  nextPages(difference: number) {
    this.currentPage = this.currentPage + difference;
    this.fetchReportContents();
  }

  private fetchReportContents() {

    console.log('tipul de data selectat :' + this.dateColumnFilter);
    // console.log('sortare: ' + this.reportView.currentSorting.getName() + ' ; ' + this.reportView.currentSorting.getValue());
    console.log('sortare: ' + this.globalHeader.fieldName + ' ; ' + this.globalHeader.sorting);
    console.log('lista filtrele cu care apelez BPM:');
    for (const index of this.reportView.currentFilters) {
      console.log(index.name + '-----' + index.value);
    }

    this.moneyGramService.getTransactions(/*apiServiceId, this.startDate + this.startTime,
      this.endDate + this.endTime,
      this.dateColumnFilter,
      this.reportView.currentSorting.getName(),
      this.reportView.currentSorting.getValue(),
      this.currentPage, this.batchSize, this.reportView.currentFilters*/
      )
      .subscribe(
        (data: any) => {
          /*
          if (data.response.payload.data.data.executionResult.message === 'Data not found') {
            this.dataFound = false;
          } else {
          */

            this.dataFound = true
            const resultsReconverted = JSON.parse(JSON.stringify(data));
            this.reportTransactionReportModelHistory = resultsReconverted;
            this.totalPages =  1;//Number(data.response.payload.data.data.totalPages);
            this.totalResults = 5;//Number(data.response.payload.data.data.totalResults);
            console.log('total pages: ' + this.totalPages + ';total results: ' + this.totalResults)
            this.buildReportView();
          //}
        },
        (error: any) => {
          this.dataFound = false;
          console.log('Eroare report: ' + error)
        }
      );
  }

  determineReportHeaderClass(reportHeader: ColumnHeader): string {
    if (reportHeader.filter || reportHeader.sorting != this.reportView.sorting.NONE) {
      if (!reportHeader.isFilterPopupVisible)
        return 'filter-active';
    }
    return 'filter-inactive';
  }

  determineFirstRow(index: number): string {
    if (index == 0)
      return 'first'
    else
      return '';
  }

  determinePopupPosition(index: number): object {
    if (index == this.reportView.activeColumnHeaders.length - 1)
      return {
        "left": "-343px"
      };
    else if (index == this.reportView.activeColumnHeaders.length - 2)
      return {
        "left": "-54px"
      };
    else
      return null;
  }

  determineColumnWidth(): object {
    const columnWidthStart = 120;

    if (this.reportView.activeColumnHeaders.length * columnWidthStart < this.windowWidth - 121)
      if (this.windowWidth > 1468)
        return {
          "width": "calc(" + 100 / this.reportView.activeColumnHeaders.length + "vw - " + 308 / this.reportView.activeColumnHeaders.length + "px)"
        };
      else
        return {
          "width": "calc(" + 100 / this.reportView.activeColumnHeaders.length + "vw - " + 120 / this.reportView.activeColumnHeaders.length + "px)"
        };
    else
      return {
        "width": columnWidthStart + "px"
      };
  }

  calculateTotalResultsText() {
    let text = 'Total rezultate: ';
    let total = this.totalResults;
    let currentBatchMin = 1;
    let currentBatchMax = this.batchSize;
    if (this.totalResults == 0) {
      this.totalResultsFooterText = text + this.totalResults;
      return;
    }

    if (total <= currentBatchMax) {
      this.totalResultsFooterText = text + currentBatchMin + ' - ' + total + ' din ' + total;
      return;
    }

    if (this.currentPage > 1) {
      currentBatchMin = currentBatchMax * (this.currentPage - 1);
      currentBatchMax = currentBatchMax * this.currentPage;
      if (total <= currentBatchMax) {
        this.totalResultsFooterText = text + currentBatchMin + ' - ' + total + ' din ' + total;
        return;
      }
      this.totalResultsFooterText = text + currentBatchMin + ' - ' + currentBatchMax + ' din ' + total;
      return;
    }

    this.totalResultsFooterText = text + currentBatchMin + ' - ' + currentBatchMax + ' din ' + total;
  }

  ngOnInit() {
    this.sucursaleService.getSucursalaList().subscribe(sucursale => {
      this.sucursale = sucursale as Sucursala[];
      this.idSucursala = "";
    })

    this.activatedRoute.queryParams.subscribe(params => {
      let report = params['report'];
      let filter = params['filter'];

      this.clearAndNewCall(this.transactionsHistoryName);
    });
    this.windowWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  X_onResize(event: any) {
    this.windowWidth = window.innerWidth;
  }

  cautaTranzactii() {
    console.log('cauta trannzatii: ' + this.idSucursala + ' ' + this.cnp );

    console.log('tipul de data selectat :' + this.dateColumnFilter);
    // console.log('sortare: ' + this.reportView.currentSorting.getName() + ' ; ' + this.reportView.currentSorting.getValue());
    console.log('sortare: ' + this.globalHeader.fieldName + ' ; ' + this.globalHeader.sorting);
    console.log('lista filtrele cu care apelez BPM:');
    for (const index of this.reportView.currentFilters) {
      console.log(index.name + '-----' + index.value);
    }
    this.moneyGramService.getTransactionsWithParams('01-07-2020', '20-07-2020', this.idSucursala.valueOf(), this.cnp.valueOf(), this.globalHeader.fieldName, this.globalHeader.sorting)
      .subscribe((data: any) => {
        console.log('am apelat');
        this.dataFound = true
        const resultsReconverted = JSON.parse(JSON.stringify(data));
        console.log(resultsReconverted);
        this.reportTransactionReportModelHistory = resultsReconverted;
        this.totalPages =  1;//Number(data.response.payload.data.data.totalPages);
        this.totalResults = 5;//Number(data.response.payload.data.data.totalResults);
        console.log('total pages: ' + this.totalPages + ';total results: ' + this.totalResults)
        this.buildReportView();
      },
        (error: any) => {
          this.dataFound = false;
          console.log('Eroare report: ' + error);
        }
      );
  }

  Amend(referenceNumber: string) {
    this.moneyGramService.detailLookup(referenceNumber).subscribe(detailLookupResponse => {
      this.detailLookupResponse = detailLookupResponse as DetailLookupResponse;
    });
  }

  realizeazaAmend() {
    this.moneyGramService.amendTransaction(this.detailLookupResponse.receiverFirstName,
                                           this.detailLookupResponse.receiverMiddleName,
                                           this.detailLookupResponse.receiverLastName,
                                           this.detailLookupResponse.receiverLastName2).subscribe(detailLookupResponse => {

    });
  }
}
