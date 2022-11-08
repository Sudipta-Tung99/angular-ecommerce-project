import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './common/head/head.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoryComponent } from './pages/category/category.component';
import { ItemsComponent } from './pages/items/items.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AdditemComponent } from './pages/additem/additem.component';
import { AddcategoryComponent } from './pages/addcategory/addcategory.component';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';
import { UpdateItemsComponent } from './pages/update-items/update-items.component';
import { ViewItemComponent } from './pages/view-item/view-item.component';
import { UserComponent } from './pages/user/user.component';
import { OrderComponent } from './pages/order/order.component';
import { LoginComponent } from './pages/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeliveredComponent } from './pages/delivered/delivered.component';
import { PdfComponent } from './pages/pdf/pdf.component';
@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    SidebarComponent,
    DashboardComponent,
    CategoryComponent,
    ItemsComponent,
    AdditemComponent,
    AddcategoryComponent,
    UpdateCategoryComponent,
    UpdateItemsComponent,
    ViewItemComponent,
    UserComponent,
    OrderComponent,
    LoginComponent,
    DeliveredComponent,
    PdfComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
