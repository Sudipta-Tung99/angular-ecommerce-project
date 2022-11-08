import { CategoryShowService } from './../../service/category-show.service';
import { ProductshowService } from './../../service/productshow.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.css']
})
export class RelatedProductComponent implements OnInit {
category:any;
product:any;
ProductshowShow: any;
  pd:any
  allcategory: any;
  categoryData: any;

  constructor(private ProductshowService:ProductshowService,private activerouter:ActivatedRoute,private CategoryShowService:CategoryShowService) {
    this.ProductshowService.getone(this.activerouter.snapshot.params).subscribe(res=>{
      this.category = res.category.category_name;
      this.categoryData=[this.category]
    })
    this.ProductshowService.getProduct().subscribe(res=>{

      var data=res.filter((item:any) =>item.category.category_name==this.category);
      this.product=[...data]
    })

    this.CategoryShowService.getCategory().subscribe(res=>{
this.allcategory = res;
})



   }

  ngOnInit(): void {
  }

  findCategory(data:any){
    if(data.target.checked){
this.categoryData=[...this.categoryData,data.target.value];
    }else{
     var dataAll= this.categoryData.filter((item:any) => item !=data.target.value);
     this.categoryData=dataAll

    }
    // this.ProductshowService.getProduct().subscribe(res=>{
    // this.product=res.filter((item:any) => item.category.category_name==this.categoryData.map((item:any)=>item));
    //   })
console.log(this.product);


    // data.target.value
    // this.pd=["Mobile","Headphone"]
    //
    // console.log(this.product);
}



}
