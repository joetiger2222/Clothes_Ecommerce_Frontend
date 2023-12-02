import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserdataService } from '../userdata.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading:boolean=false;
  constructor(private httpClient:HttpClient,private userData:UserdataService,private router:Router){}

  register(registerData:NgForm){
    console.log(registerData.value)
    if(registerData.form.controls['email']['invalid']){
      alert('Please enter a valid email')
      return;
    }
    if(registerData.form.controls['password']['invalid']){
      alert('Please enter a valid password')
      return;
    }
    const userToAdd={
      username:registerData.value.username,
      email:registerData.value.email,
      password:registerData.value.password,
      roles:["Reader"]
    }
    this.isLoading=true
    this.httpClient.post(`https://jotiger12345-001-site1.gtempurl.com/api/Auth/Register`,userToAdd).subscribe({
      next:res=>{
        alert('User Registration Success,please login')
        this.isLoading=false
        this.router.navigate(['/login'])
      },
      error:err=>{
        console.log(err);
        alert('User Registration Success,please login')
        this.isLoading=false
        this.router.navigate(['/login'])
      }
    })
}
}
