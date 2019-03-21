import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users: User[];

  constructor(private data: DataService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((result: User[]) =>
    {
      this.users = result;
    }, error =>
    {
      console.log(error);
    });
  }

  create(user: User){
    this.userService.createUser(user);
  }

  update(user: User) {
    this.userService.updateUser(user);
  }

  delete(user: User) {
    this.userService.deleteUser(user);
  }

}
