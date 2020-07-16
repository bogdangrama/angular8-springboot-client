import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {Sucursala} from '../../models/sucursala';
import {SucursaleService} from '../../services/sucursale.service';

@Component({
  selector: 'app-sucursale-list',
  templateUrl: './sucursale-list.component.html',
  styleUrls: ['./sucursale-list.component.css']
})
export class SucursaleListComponent implements OnInit {

  sucursale: Observable<Sucursala[]>;

  constructor(private sucursaleService: SucursaleService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.sucursale = this.sucursaleService.getSucursalaList();
  }

  deleteSucursala(id: number) {
    this.sucursaleService.deleteSucursala(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  sucursalaDetails(id: number) {
    this.router.navigate(['definireSucursala', id]);
  }
}
