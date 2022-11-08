import { SearchComponent } from './pages/search/search.component';
import { OrderdetailsComponent } from './pages/orderdetails/orderdetails.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AddressComponent } from './pages/address/address.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RelatedProductComponent } from './pages/related-product/related-product.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home/:id",component:SearchComponent},
  {path:"detail/:id",component:DetailsComponent},
  {path:"sinein",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"cart",component:CartComponent},
  {path:"profile",component:ProfileComponent},
  {path:"related/:id",component:RelatedProductComponent},
  {path:'address',component:AddressComponent},
  {path:'payment',component:PaymentComponent},
  {path:'payment/:id',component:PaymentComponent},
  {path:'order',component:OrderdetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
