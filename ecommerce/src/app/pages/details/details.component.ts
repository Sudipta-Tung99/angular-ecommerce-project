import { AddressService } from './../../service/address.service';
import { CartService } from './../../service/cart.service';
import { ProductshowService } from './../../service/productshow.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product: any
  img: any;
  p: any
  authToken: any;
  decord: any;
  data: any;
  constructor( private Router: Router, private router: ActivatedRoute, private ProductshowService: ProductshowService, private routerDerive: Router, private CartService: CartService, private jwt: JwtHelperService, private AddressService: AddressService) {
    this.ProductshowService.getone(router.snapshot.params).subscribe(res => {

      this.product = res
      this.p = res
      this.img = res.item_img
    })

    this.AddressService.getOne().subscribe({
      next: (e) => {
        this.data = e

      },
      error: (e) => {

      },
      complete: () => { }
    })

  }

  ngOnInit(): void {
  }

  addCart(data: any) {
    this.authToken = localStorage.getItem("x-token");
    this.decord = this.jwt.decodeToken(this.authToken);
    this.CartService.addNewItem({ productId: data }).subscribe({
      next: (e) => {



      },
      error: (e) => {
        this.Router.navigate(['/login'])


      },
      complete: () => {
        window.location.pathname = '/cart'

      },
    })
  }

  buyNow(data:any) {
    this.authToken = localStorage.getItem("x-token");

    if(this.authToken){
    if(this.data){
      this.Router.navigate([`/payment/${data}`])
    }else{
      this.Router.navigate(['/address'])
    }
  }else{
    this.Router.navigate(['/login'])
  }


  }


}
