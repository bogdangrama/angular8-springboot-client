import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SucursaleListComponent} from './components/sucursale/sucursale-list.component';
import {DefinireSucursalaComponent} from './components/sucursale/definiresucursala.component';
import {DefinireUserComponent} from './components/users/definireuser.component';
import {UsersListComponent} from './components/users/user-list.component';
import {SendComponent} from './components/send/send.component';
import {ReceiveComponent} from './components/receive/receive.component';
import {SendReceiptComponent} from './components/send/sendReceipt.component';
import {TransactionsComponent} from './components/transactions/transactions.component';
import {FindLocationsComponent} from './components/findLocations/findLocations.component';
import {GetProfileComponent} from './components/getProfile/getProfile.component';
import {StartComponent} from './components/start/start.component';

let routes: Routes;
routes = [

  {path: '', redirectTo: 'employee', pathMatch: 'full'},
  {path: 'sucursale', component: SucursaleListComponent},
  {path: 'definireSucursala', component: DefinireSucursalaComponent},
  {path: 'definireSucursala/:id', component: DefinireSucursalaComponent},
  {path: 'users', component: UsersListComponent},
  {path: 'definireUser', component: DefinireUserComponent},
  {path: 'definireUser/:id', component: DefinireUserComponent},
  {path: 'send', component: SendComponent},
  {path: 'receive', component: ReceiveComponent},
  {path: 'sendReceipt', component: SendReceiptComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'findLocations', component: FindLocationsComponent},
  {path: 'getProfile', component: GetProfileComponent},
  {path: 'start', component: StartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
