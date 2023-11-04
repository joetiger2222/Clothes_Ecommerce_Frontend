import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserdataService } from '../userdata.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  id:number=0;
  productDetails!:singleProduct
  choosenImg!:string
  constructor(private activatedRoute:ActivatedRoute,private httpClient:HttpClient,private userData:UserdataService){}
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id=params['id'];
    })
    console.log(this.id);
    this.getProductDetails(this.id)
  }

  getProductDetails(id:number){
    this.httpClient.get<singleProduct>(`https://jotiger12345-001-site1.gtempurl.com/api/Clothes/${id}`).subscribe({
      next:res=>{
        console.log(res);
        this.productDetails=res;
        this.choosenImg=res.imgsPaths[0].filePath
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  changeMainImage(id:string){
    const imagePath=this.productDetails.imgsPaths.find(img=>img.id==id)?.filePath;
    if(imagePath){
      this.choosenImg=imagePath;
    }
    
  }

  addToCart(){
    const cart={userId:this.userData.userId,clothId:this.productDetails.id,quantity:1}
    this.httpClient.post(`https://jotiger12345-001-site1.gtempurl.com/api/Cart`,cart).subscribe({
      next:res=>{
        console.log(res);
        alert('Added to cart')
      },
      error:err=>{
        console.log(err);
      }
    })
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