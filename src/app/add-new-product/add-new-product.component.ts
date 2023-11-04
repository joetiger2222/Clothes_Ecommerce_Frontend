import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent {
constructor(private httpClient:HttpClient,private router:Router){}

  createNewProduct(product:NgForm){
    
    const productToAd={
      name:product.value.name,
      description:product.value.description,
      categoryId:product.value.categoryId*1,
      quanitity:product.value.quanitity,
      hasDiscount:false,
      price:product.value.price,
      discount:0
    }
    this.httpClient.post(`https://jotiger12345-001-site1.gtempurl.com/api/Clothes`,productToAd).subscribe({
      next:res=>{
        alert('Product Added successfully')
      },
      error:err=>{
        alert("Failed to add product")
      }
    })
    
  }


}
