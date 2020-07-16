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
import {ProfileResponse} from '../../models/ProfileResponse';

@Component({
  selector: 'app-getProfile',
  templateUrl: './getProfile.component.html',
  styleUrls: ['./getProfile.component.scss']
})

export class GetProfileComponent implements OnInit {

  profileResponse: ProfileResponse;

  constructor(private moneyGramService: MoneyGramService, private activatedRoute: ActivatedRoute) {
  };

  ngOnInit() {
    this.moneyGramService.profile()
      .subscribe(results => {
          const resultsReconverted = JSON.parse(JSON.stringify(results));
          this.profileResponse = resultsReconverted;
          console.log(this.profileResponse);
        },
        error => {
        });
  }


}
