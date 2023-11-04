import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserdataService } from '../userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private httpClient:HttpClient,private userData:UserdataService,private router:Router){}

  loginAdmin(loginData:NgForm){
    console.log(loginData.value)
    if(loginData.form.controls['email']['invalid']){
      alert('Please enter a valid email')
      return;
    }
    if(loginData.form.controls['password']['invalid']){
      alert('Please enter a valid password')
      return;
    }
    this.httpClient.post<{userId:string,role:string}>(`https://jotiger12345-001-site1.gtempurl.com/api/Auth/Login/Admin`,loginData.value).subscribe({
      next:res=>{
        this.userData.userId=res.userId;
        this.userData.userRole=res.role
        this.router.navigate(['/adminDashboard']);
      },
      error:err=>{
        console.log(err);
        this.loginUser(loginData.value)
      }
    })
    
  }

  loginUser(loginData:LoginData){
    this.httpClient.post<{userId:string,role:string}>(`https://jotiger12345-001-site1.gtempurl.com/api/Auth/Login/User`,loginData).subscribe({
      next:res=>{
        this.userData.userId=res.userId;
        this.userData.userRole=res.role
        this.router.navigate(['..']);
      },
      error:err=>{
        console.log(err);
        alert('Wrong Username or Password')
      }
    })
  }

}

interface LoginData{
  email:string;
  password:string;
}