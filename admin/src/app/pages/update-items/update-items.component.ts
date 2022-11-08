import { CategoryService } from './../../service/category.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from './../../service/items.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.css']
})
export class UpdateItemsComponent implements OnInit {


  editProduct=new FormGroup({
    name: new FormControl(""),
    description:new FormControl(""),
    category:new FormControl(""),
    price:new FormControl(""),
    stock:new FormControl("")

  })
  data: any;
categoryname:any

  constructor(private ItemsService:ItemsService, private routerid:ActivatedRoute,private CategoryService:CategoryService) {
    this.ItemsService.getone(this.routerid.snapshot.params).subscribe((res)=>{
    this.data = res
   this.editProduct=new FormGroup({
    name: new FormControl(this.data['item_name']),
    description:new FormControl(this.data['description']),
    category:new FormControl(this.data.category['category_name']),
    price:new FormControl(this.data['price']),
    stock:new FormControl(this.data['stock'])

  })
      // this.editProduct =new FormGroup({
      //   name: new FormControl(res['item_name'])
      // })
    })

    this.CategoryService.getCategory().subscribe((res)=>{
this.categoryname = res
console.log(this.categoryname);

    })
  }

  ngOnInit(): void {
  }
  onsubmit(){
console.log(this.editProduct);

  }

}
