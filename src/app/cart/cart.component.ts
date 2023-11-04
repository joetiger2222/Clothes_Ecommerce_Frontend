import { Component } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {

  cartItems!: SingleCartItem[]


  constructor(
    private userData: UserdataService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.getCart();
  }
  getCart() {
    this.httpClient.get<SingleCartItem[]>(`https://jotiger12345-001-site1.gtempurl.com/api/Cart/${this.userData.userId}`).subscribe({
      next: (res) => {
        console.log(res);
        this.cartItems=res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  increaseQ(id:string, quantity:number){
    this.httpClient.put(`https://jotiger12345-001-site1.gtempurl.com/api/Cart/${id}`,{quantity:quantity+1}).subscribe({
      next:res=>{
        console.log(res);
        this.getCart();
      },
      error: (err) => {
        alert('Error')
      }
    })
  }

  decreaseQ(id:string, quantity:number){
    this.httpClient.put(`https://jotiger12345-001-site1.gtempurl.com/api/Cart/${id}`,{quantity:quantity-1}).subscribe({
      next:res=>{
        console.log(res);
        this.getCart();
      },
      error: (err) => {
        alert('Error')
      }
    })
  }


  removeFromCart(id:string){
    this.httpClient.delete(`https://jotiger12345-001-site1.gtempurl.com/api/Cart/${id}`).subscribe({
      next:res=>{
        
        this.getCart();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}

interface SingleCartItem{
  id:string,
  quantity:number
  clotheItem:
  {
    id:number;
    name:string;
    description:string;
    quantity:number;
    price:number;
    imgsPaths:[{id:string, name:string,filePath:string,clotheItemId:number}]
  }
}

