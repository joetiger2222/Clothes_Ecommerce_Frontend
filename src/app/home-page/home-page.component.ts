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
  constructor(private http:HttpClient,private userData:UserdataService,private router:Router) {}

  ngOnInit() {
    this.getClothesItems();
    console.log(this.userData)
  }

  allProducts!:singleProduct[];

  getClothesItems(){
    this.http.get<singleProduct[]>( `https://jotiger12345-001-site1.gtempurl.com/api/Clothes`).subscribe({
      next:res=>{
        console.log(res);
        this.allProducts=res
        
      },
      error:err=>{
        console.log(err);
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