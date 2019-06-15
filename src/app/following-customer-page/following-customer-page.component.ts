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
    this.follow= this.followingService.getfollowingCoustmer("customerId");
    console.log(this.follow.length)
  }

  delete(followingcustomer, i){
    this.followingService.unFollow(followingcustomer).then((success) =>
    {
      if(success)
        this.follow.splice(i, 1);
    });
  }

}
