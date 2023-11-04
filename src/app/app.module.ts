import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { RegisterComponent } from './register/register.component';


const appRoute:Routes=[
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path:'productDetails/:id', component: ProductDetailsComponent},
  {path:'cart',component: CartComponent},
  {path:'adminDashboard',component: AdmindashboardComponent},
  {path:'addNewProduct',component: AddNewProductComponent},
  {path:'editProduct/:id',component: EditProductComponent},
  {path:'register',component: RegisterComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    LoginComponent,
    ProductDetailsComponent,
    CartComponent,
    AdmindashboardComponent,
    AddNewProductComponent,
    EditProductComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoute),
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
