import { PdfComponent } from './pages/pdf/pdf.component';
import { UserComponent } from './pages/user/user.component';
import { DeliveredComponent } from './pages/delivered/delivered.component';
import { OrderComponent } from './pages/order/order.component';
import { ViewItemComponent } from './pages/view-item/view-item.component';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';
import { AdditemComponent } from './pages/additem/additem.component';

import { ItemsComponent } from './pages/items/items.component';
import { CategoryComponent } from './pages/category/category.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcategoryComponent } from './pages/addcategory/addcategory.component';
import { UpdateItemsComponent } from './pages/update-items/update-items.component';

const routes: Routes = [
  {path:"",component:DashboardComponent},
  {path:"category",component:CategoryComponent},
  {path:'item',component:ItemsComponent},
  {path:'user',component:UserComponent},
  {path:'addcategory',component:AddcategoryComponent},
  {path:'additem',component:AdditemComponent},
  {path:'updatecategory/:id',component:UpdateCategoryComponent},
  {path:'viewItem/:id',component:ViewItemComponent},
  {path:"updateitem/:id",component:UpdateItemsComponent},
  {path:'order',component:OrderComponent},
  {path:'delivered',component:DeliveredComponent},
  {path:'pdf/:id',component:PdfComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
