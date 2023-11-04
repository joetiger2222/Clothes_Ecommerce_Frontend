import { Component } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userDataHeader:UserdataService;
constructor(private userData:UserdataService,private router:Router){
  this.userDataHeader=userData
}

logout(){
  this.userData.userId=null;
  this.userData.userRole=null;
  this.router.navigate(['/'])
  console.log(this.userData)
}

goToCart(){
this.router.navigate(['/cart']);
}

goToHomePage(){
  this.router.navigate(['/']);
  }

checkCart(){
  if(this.userData.userId===null){
    return false
  }
  if(this.userData.userRole==='Admin'){
    return false
  }
  return true
}

}
