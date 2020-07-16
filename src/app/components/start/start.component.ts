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
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})

export class StartComponent implements OnInit {

  ngOnInit() {

  }

}
