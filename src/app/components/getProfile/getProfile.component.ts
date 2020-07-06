import {
  Component, HostListener,
  OnInit,
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NameValue} from '../../models/NameValue';
import {MoneyGramService} from '../../services/moneygram.service';
import {ColumnHeader} from '../../models/ColumnHeader';
import {ReportView} from '../../models/ReportView';
import {CountryInfo} from '../../models/countryInfo';
import {AgentInfoModel} from '../../models/AgentInfoModel';

@Component({
  selector: 'app-findLocations',
  templateUrl: './findLocations.component.html',
  styleUrls: ['./findLocations.component.scss']
})

export class FindLocationsComponent implements OnInit {

  // Filters and Sorting
  transactionHistory = new AgentInfoModel()
  countryInfoList: CountryInfo[];
  cityList: string[];
  selectedCountryInfo: CountryInfo;
  selectedCity: string;

  transactionsHistoryName = 'Istoric Tranzactii';

  windowWidth: any;

  // rapoarte complete
  reportTransactionReportModelHistory: AgentInfoModel[] = [];

  reportView = new ReportView();

  typeOfTransactionReportModel: NameValue[] = [
    new NameValue('agentName',
      this.transactionHistory.agentName),
    new NameValue('adresa',
      this.transactionHistory.address),
    new NameValue('sendReceiveCapability',
      this.transactionHistory.sendReceiveCapability),
    new NameValue('telefon',
      this.transactionHistory.agentPhone),
    new NameValue('program',
      this.transactionHistory.storeHours)
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

  constructor(private moneyGramService: MoneyGramService, private activatedRoute: ActivatedRoute) {
  };

  clearAndNewCall(selectedReportName: string) {
    this.emptyFilters();

    this.reportView.columnHeaders = this.transactionHistory.getAllHeaders();

    this.fetchReportContents();
    this.currentPage = 1;
  }

  buildReportView() {
    this.reportView.reportContent = [];

    for (let reportLine of this.reportTransactionReportModelHistory) {
      let reportLineObject = new AgentInfoModel();
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
    if (sortAsc) {
      header.sorting = this.reportView.sorting.ASC
    }

    if (sortDesc) {
      header.sorting = this.reportView.sorting.DESC
    }

    if (filter) {
      header.filter = filter;
    } else if (header.filter)
      header.filter = filter;

    this.reportView.processFilters(header);
    this.fetchReportContents();
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
    console.log('sortare: ' + this.reportView.currentSorting.getName() + ' ; ' + this.reportView.currentSorting.getValue());
    console.log('lista filtrele cu care apelez BPM:');
    for (const index of this.reportView.currentFilters) {
      console.log(index.name + '-----' + index.value);
    }

    this.moneyGramService.directoryOfAgentsByCity(this.selectedCountryInfo.CountryCode, this.selectedCity, "undefined")
      .subscribe(
        (data: any) => {
            this.dataFound = true
            const resultsReconverted = JSON.parse(JSON.stringify(data));
            this.reportTransactionReportModelHistory = resultsReconverted;
            this.totalPages =  10;//Number(data.response.payload.data.data.totalPages);
            this.totalResults = 10//Number(data.response.payload.data.data.totalResults);
            console.log('total pages: ' + this.totalPages + ';total results: ' + this.totalResults)
            this.buildReportView();
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
    const columnWidthStart = 291;

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
    this.moneyGramService.getCountryInfoList()
      .subscribe(results => {
          const resultsReconverted = JSON.parse(JSON.stringify(results));
          this.countryInfoList = resultsReconverted;
        },
        error => {
        });
  }

  @HostListener('window:resize', ['$event'])
  X_onResize(event: any) {
    this.windowWidth = window.innerWidth;
  }

  receiveCountryChange() {
    if (this.selectedCountryInfo != null) {
      this.moneyGramService.cityList(this.selectedCountryInfo.CountryCode, "undefined")
        .subscribe(results => {
            const resultsReconverted = JSON.parse(JSON.stringify(results));
            this.cityList = resultsReconverted;
          },
          error => {
          });
    }
  }

  CautaLocatii() {
    console.log('Cautam locatii');
    this.activatedRoute.queryParams.subscribe(params => {
      this.clearAndNewCall(this.transactionsHistoryName);
    });
    this.windowWidth = window.innerWidth;
  }
}
