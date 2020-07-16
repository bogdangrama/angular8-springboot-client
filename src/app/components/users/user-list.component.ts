import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {User} from '../../models/user';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private usersService: UsersService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.users = this.usersService.getUserList();
  }

  deleteSucursala(id: string) {
    this.usersService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  userDetails(id: number) {
    this.router.navigate(['definireUser', id]);
  }
}
