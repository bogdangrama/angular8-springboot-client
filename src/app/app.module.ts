import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {SucursaleListComponent} from './components/sucursale/sucursale-list.component';
import {EmployeeService} from './employee.service';
import {SucursaleService} from './services/sucursale.service';
import {DefinireSucursalaComponent} from './components/sucursale/definiresucursala.component';
import {UsersListComponent} from './components/users/user-list.component';
import {UsersService} from './services/users.service';
import {DefinireUserComponent} from './components/users/definireuser.component';
import {SendComponent} from './components/send/send.component';
import {MoneyGramService} from './services/moneygram.service';
import {ReceiveComponent} from './components/receive/receive.component';
import {SendReceiptComponent} from './components/send/sendReceipt.component';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {TransactionsComponent} from './components/transactions/transactions.component';
import {FindLocationsComponent} from './components/findLocations/findLocations.component';
import {GetProfileComponent} from './components/getProfile/getProfile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StartComponent} from './components/start/start.component';
import {PopoverModule} from 'ngx-smart-popover';
import {UfeDateRangePickerModule} from './components/utils/ufe-date-range-picker/ufe-date-range-picker-module';
import {UfeDigitsInputModule} from './components/utils/ufe-digits-input/ufe-digits-input.module';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [
    AppComponent,
    SucursaleListComponent,
    DefinireSucursalaComponent,
    UsersListComponent,
    DefinireUserComponent,
    SendComponent,
    ReceiveComponent,
    SendReceiptComponent,
    TransactionsComponent,
    FindLocationsComponent,
    GetProfileComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SelectDropDownModule,
    BrowserAnimationsModule,
    PopoverModule,
    UfeDateRangePickerModule,
    UfeDigitsInputModule,
    ClickOutsideModule
  ],
  providers: [
    EmployeeService,
    SucursaleService,
    UsersService,
    MoneyGramService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
