import { AddressService } from './../../service/address.service';
import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  count: any;
  authToken: any;
  decord: any;
  allCart: any
  total: any;
  price: any;
  gst: any;
  totalAmount: any;
  delivery: any;
  message: any;
  stock: any;
  data: any;

  constructor(private CartService: CartService, private jwt: JwtHelperService, private route: Router, private toast: ToastrService, private AddressService: AddressService) {


    this.count = 1
    this.authToken = localStorage.getItem("x-token");
    this.decord = this.jwt.decodeToken(this.authToken);

    this.CartService.getAllProduct().subscribe((res) => {


      this.allCart = res

      this.total = 0;
      this.price = 0;
      for (let item of res) {
        this.total += item.qty
      }

      for (let item of res) {
        this.price += item.productId.price * item.qty
      }
      // this.gst = this.price / 20;

      this.totalAmount = Math.round(this.price )

      if (this.price <= 500) {
        this.delivery = 50
      } else {
        this.delivery = 0
      }


    })

    this.AddressService.getOne().subscribe({
      next: (e) => {
        this.data = e

      },
      error: (e) => {

      },
      complete: () => {

      }
    })


  }

  ngOnInit(): void {

  }
  add(data: any) {
    this.CartService.addNewItem({ productId: data }).subscribe({
      next: (e) => {



      },
      error: (e) => {

      },
      complete: () => {


      },

    })
    this.toast.success('Product added successfully', '', {
      positionClass: 'toast-bottom-center'
    })
    window.setTimeout(function () { location.reload() }, 1500)
  }

  minas(data: any) {
    this.CartService.removeItem({ productId: data }, this.decord._id).subscribe((res) => {


    })
    this.toast.info('Product Remove successfully', '', {
      positionClass: 'toast-bottom-center',

    })
    window.setTimeout(function () { location.reload() }, 2000)
  }

  removeItem(id: any) {
    this.CartService.remove(id).subscribe((res) => {
      if (res.message) {
        this.toast.warning('Product successfully Deleted', '', {
          positionClass: 'toast-bottom-center',

        })
        window.setTimeout(function () { location.reload() }, 1500)
      }



    })

  }

  link(id: any) {
    this.route.navigate([`/detail/${id}`])

  }
  place(){
    if(this.data){
      this.route.navigate(['/payment'])
    }else{
      this.route.navigate(['/address'])
    }
  }
}
