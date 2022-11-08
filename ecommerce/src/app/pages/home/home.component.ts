import { ActivatedRoute } from '@angular/router';
import { CategoryShowService } from './../../service/category-show.service';
import { HttpClient } from '@angular/common/http';
import { ProductshowService } from './../../service/productshow.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  product: any;
  category: any
  params: any;
  constructor(private ProductshowService: ProductshowService, private CategoryShowService: CategoryShowService, private ActivatedRoute: ActivatedRoute) {
    this.ProductshowService.getProduct().subscribe(res=>{
      this.product=res
    })
    this.CategoryShowService.getCategory().subscribe((res) => {
      this.category = res
    })

  }

  ngOnInit(): void {
    // this.ActivatedRoute.params.subscribe(params => {
    //   const { id } = params
    //   console.log(id.toLowerCase());

    //   if (id) {
    //     this.ProductshowService.getProduct().subscribe({
    //       next: (e) => {
    //        var prod={}
    //         e.filter((element: any) => {
    //           if(element.item_name.toLowerCase().includes(id.toLowerCase())){
    //             console.log(element);
    //             prod=element

    //           }
    //           this.product=prod




    //         })

            // e.forEach((element: any) => {
            //   // console.log(element.item_name.toLowerCase().includes(id.toLowerCase()));

            //   if (element.item_name.toLowerCase().includes(id.toLowerCase())) {

            //      this.product = element
            //     }


            // });


            //  item.item_name.toLowerCase()


    //         console.log(this.product);
    //       },
    //       error: () => {

    //       }
    //     })
    //   }



    // })


  }

}
