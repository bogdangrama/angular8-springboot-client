import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user';
import {UsersService} from '../../services/users.service';
import {Observable} from 'rxjs';
import {Sucursala} from '../../models/sucursala';
import {SucursaleService} from '../../services/sucursale.service';

@Component({
  selector: 'app-definireuser',
  templateUrl: './definireuser.component.html',
  styleUrls: ['./definireuser.component.css']
})
export class DefinireUserComponent implements OnInit {

  id: string;
  user: User = new User();
  submitted = false;
  sucursaleObservable: Observable<Sucursala[]>;
  sucursale: Sucursala[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UsersService,
              private sucursaleService: SucursaleService) { }

  ngOnInit() {
    this.sucursaleService.getSucursalaList().subscribe(sucursale => {
      this.sucursale = sucursale as Sucursala[];

      /*
      let liniiReconverted = JSON.parse(JSON.stringify(sucursale));
      this.sucursale = liniiReconverted
      console.log(this.sucursale);
       */
    })

    this.id = this.route.snapshot.params.id;

    if (this.id == null) {
      // User noua
    }
    else {
      this.userService.getUser(this.id)
        .subscribe(data => {
          console.log(data);
          this.user = data;
        }, error => console.log(error));
    }
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {
    if (this.id == null) {
      console.log(this.user);

      // Salvare user nou
      this.userService.createUser(this.user)
          .subscribe(data => this.gotoList(), error => console.log(error));
    }
    else {
      this.userService.updateUser(this.id, this.user)
        .subscribe(data => this.gotoList(), error => console.log(error));
    }
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/users']);
  }
}
