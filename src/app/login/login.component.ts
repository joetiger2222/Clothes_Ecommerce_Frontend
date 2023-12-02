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
  isLoading:boolean = false;
  constructor(private httpClient:HttpClient,private userData:UserdataService,private router:Router){}

  loginAdmin(loginData:NgForm){
    const login=loginData.value
    if(loginData.form.controls['email']['invalid']){
      alert('Please enter a valid email')
      return;
    }
    if(loginData.form.controls['password']['invalid']){
      alert('Please enter a valid password')
      return;
    }
    this.isLoading=true
    this.httpClient.post<{userId:string,role:string}>(`https://jotiger12345-001-site1.gtempurl.com/api/Auth/Login/Admin`,login).subscribe({
      next:res=>{
        this.userData.userId=res.userId;
        this.userData.userRole=res.role
        this.router.navigate(['/adminDashboard']);
        this.isLoading=false
      },
      error:err=>{
        console.log(err);
        this.loginUser(login)
      }
    })
    
  }

  loginUser(loginData:LoginData){
    this.httpClient.post<{userId:string,role:string}>(`https://jotiger12345-001-site1.gtempurl.com/api/Auth/Login/User`,loginData).subscribe({
      next:res=>{
        this.userData.userId=res.userId;
        this.userData.userRole=res.role
        this.router.navigate(['..']);
        this.isLoading=false
      },
      error:err=>{
        console.log(err);
        alert('Wrong Username or Password')
        this.isLoading=false
      }
    })
  }

}

interface LoginData{
  email:string;
  password:string;
}