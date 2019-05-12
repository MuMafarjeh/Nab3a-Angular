import { Component, OnInit, Input } from '@angular/core';
import { following } from './following';
import { FollowingService } from '../services/following.service';

@Component({
  selector: 'app-following-customer-page',
  templateUrl: './following-customer-page.component.html',
  styleUrls: ['./following-customer-page.component.scss']
})
export class FollowingCustomerPageComponent implements OnInit {

  constructor(private followingService:FollowingService   ) { }
   @Input()
  Follow:following;
  follow : following[];

  ngOnInit() {
    this.follow= this.followingService.getfollowingCoustmer();

  }

  delete(followingcustomer){

  //  console.log(this.Follow.customerId);
     this.followingService.unFollow(followingcustomer);
     window.location.reload();


  }

}
