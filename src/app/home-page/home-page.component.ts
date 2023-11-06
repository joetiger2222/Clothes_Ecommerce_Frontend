import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserdataService } from '../userdata.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  isLoading:boolean = false;
  constructor(private http:HttpClient,private userData:UserdataService,private router:Router) {}

  ngOnInit() {
    this.getClothesItems();
    
  }

  allProducts!:singleProduct[];

  getClothesItems(){
    this.isLoading=true;
    this.http.get<singleProduct[]>( `https://jotiger12345-001-site1.gtempurl.com/api/Clothes`).subscribe({
      next:res=>{
       
        this.allProducts=res
        this.isLoading=false
      },
      error:err=>{
        console.log(err);
        this.isLoading=false;
      }
    })
  }


  navigateToProductDetails(id : number){
    this.router.navigate(['/productDetails/'+id]);
  }

  

}

interface singleProduct{
    id:number;
    name:string;
    description:string;
    quantity:number;
    price:number;
    imgsPaths:[{id:string, name:string,filePath:string,clotheItemId:number}]

}