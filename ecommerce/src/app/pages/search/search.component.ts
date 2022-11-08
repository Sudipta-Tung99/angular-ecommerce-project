import { ProductshowService } from './../../service/productshow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  data: any;
  params: any;
  product: any;
  open: any;

  constructor(private ActivatedRoute: ActivatedRoute, private ProductshowService: ProductshowService, private Router: Router) {
    const { id } = this.ActivatedRoute.snapshot.params
    this.params = id
    console.log(this.params);


    this.ProductshowService.getProduct().subscribe({
      next: (e) => {
        if (this.params) {
          // e.filter((element: any) => {
          //   if (element.item_name.toLowerCase().split(" ").join('').includes(this.params.toLowerCase().split(" ").join(''))) {

          //     console.log(element);

          //     this.open=true
              this.product = e

          //   }
          //   else{
          //     this.open=false
          //   }
          // })

          } else {
          this.Router.navigate(['/'])
        }


        // for (let i = 0; i < e.length; i++) {
        //   let pd = e[i]
        //   console.log(pd);

        // this.data = e.forEach((element:any) => {
        //    if(element.item_name.toUpperCase().split("")===this.params.split('')){
        //     console.log(element);

        //    }
        // });


      },
      error: () => {

      }
    })
  }


  ngOnInit(): void {
  }


}
