import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SucursaleService} from '../../services/sucursale.service';
import {Sucursala} from '../../models/sucursala';

@Component({
  selector: 'app-definiresucursala',
  templateUrl: './definiresucursala.component.html',
  styleUrls: ['./definiresucursala.component.css']
})
export class DefinireSucursalaComponent implements OnInit {

  id: number;
  sucursala: Sucursala = new Sucursala();
  submitted = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sucursalaService: SucursaleService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    if (this.id == null) {
      // Sucursala noua
    }
    else {
      this.sucursalaService.getSucursala(this.id)
        .subscribe(data => {
          console.log(data);
          this.sucursala = data;
        }, error => console.log(error));
    }
  }

  newSucursala(): void {
    this.submitted = false;
    this.sucursala = new Sucursala();
  }

  save() {
    if (this.id == null) {
      // Salvare sucursala  noua
      this.sucursalaService.createSucursala(this.sucursala)
          .subscribe(data => this.gotoList(), error => console.log(error));
    }
    else {
      this.sucursalaService.updateSucurala(this.id, this.sucursala)
        .subscribe(data => this.gotoList(), error => console.log(error));
    }
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/sucursale']);
  }
}
