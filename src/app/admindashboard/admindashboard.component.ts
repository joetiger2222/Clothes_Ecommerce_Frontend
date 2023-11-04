import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from '../userdata.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  constructor(private httpClient:HttpClient,private router:Router,private userData:UserdataService){}


  ngOnInit() {
    this.getClothesItems();
    console.log(this.userData)
  }

  allProducts!:singleProduct[];

  getClothesItems(){
    this.httpClient.get<singleProduct[]>( `https://jotiger12345-001-site1.gtempurl.com/api/Clothes`).subscribe({
      next:res=>{
        console.log(res);
        this.allProducts=res
        
      },
      error:err=>{
        console.log(err);
      }
    })
  }




  deleteItem(id:number){
    this.httpClient.delete(`https://jotiger12345-001-site1.gtempurl.com/api/Clothes/${id}`).subscribe({
      next:res=>{
        this.getClothesItems();
      },
      error:err=>{
        alert('Failed to delete')
      }
    })
  }

  navigateToAddNewProduct(){
    this.router.navigate(['/addNewProduct'])
  }
  navigateToEditProduct(id: number){
    this.router.navigate(['/editProduct/'+id])
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