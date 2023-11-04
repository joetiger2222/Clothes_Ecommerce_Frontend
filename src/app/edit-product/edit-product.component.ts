import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  id:number=0;
  productDetails!:singleProduct
  photo:File|null=null;
constructor(private httpClient:HttpClient,private activatedRoute:ActivatedRoute){}
ngOnInit() {
  this.activatedRoute.params.subscribe(params => {
    this.id=params['id'];
  })
  console.log(this.id);
  this.getProductDetails(this.id)
}
  editProduct(product:NgForm){
    
    const productToAEdit={
      name:product.value.name,
      description:product.value.description,
      categoryId:product.value.categoryId*1,
      quanitity:product.value.quanitity,
      hasDiscount:false,
      price:product.value.price,
      discount:0
    }
    console.log(`editProduct ~ productToAd:`, productToAEdit)
    this.httpClient.put(`https://jotiger12345-001-site1.gtempurl.com/api/Clothes/${this.id}`,productToAEdit).subscribe({
      next:res=>{
        alert('Product Edited successfully')
      },
      error:err=>{
        alert("Failed to Edit product")
      }
    })

    
    
  }
  getProductDetails(id:number){
    this.httpClient.get<singleProduct>(`https://jotiger12345-001-site1.gtempurl.com/api/Clothes/${id}`).subscribe({
      next:res=>{
        console.log(res);
        this.productDetails=res;
        
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  addNewImage(){
    const formData:FormData=new FormData();
    if(this.photo){
      formData.append('File',this.photo);
      formData.append('ClotheItemId',this.id.toString());
      formData.append('FileName',this.photo.name);
      this.httpClient.post(`https://jotiger12345-001-site1.gtempurl.com/api/Clothes/AddNewImg`,formData).subscribe({
        next:res=>{
          alert('Image saved successfully')
          console.log(res)
        },
        error:err=>{
          alert('Failed to save image')
          console.log(err)
        }
      })
    }
    
  }

  setPhoto(event:Event){
    const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files[0]) {
    this.photo = inputElement.files[0];
  }
  }

}
interface singleProduct{
  id:number;
  name:string;
  description:string;
  quanitity:number;
  price:number;
  category:{id:number, name:string};
  imgsPaths:[{id:string, name:string,filePath:string,clotheItemId:number}]

}