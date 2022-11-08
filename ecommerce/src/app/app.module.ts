import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { CartComponent } from './pages/cart/cart.component';
import { FooterComponent } from './common/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { RelatedProductComponent } from './pages/related-product/related-product.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ProfileComponent } from './pages/profile/profile.component';
import { ToastrModule } from 'ngx-toastr';
import { AddressComponent } from './pages/address/address.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { OrderdetailsComponent } from './pages/orderdetails/orderdetails.component';
import { SearchComponent } from './pages/search/search.component';
import { Ng2SearchPipeModule} from 'ng2-search-filter';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DetailsComponent,
    CartComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    RelatedProductComponent,
    ProfileComponent,
    AddressComponent,
    PaymentComponent,
    OrderdetailsComponent,
    SearchComponent,

  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({})
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
     JwtHelperService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
