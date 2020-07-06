import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../services/sucursale.service';
import {User} from '../../models/user';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-definireuser',
  templateUrl: './definireuser.component.html',
  styleUrls: ['./definireuser.component.css']
})
export class DefinireUserComponent implements OnInit {

  id: number;
  user: User = new User();
  submitted = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UsersService) { }

  ngOnInit() {
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
      // Salvare user  noua
      this.userService.createUser(this.user)
          .subscribe(data => this.gotoList(), error => console.log(error));
    }
    else {
      this.userService.updateSucurala(this.id, this.user)
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
