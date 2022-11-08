import { PaymentService } from './../../service/payment.service';
import { ProductshowService } from './../../service/productshow.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../../service/order.service';
import { CartService } from './../../service/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from './../../service/address.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  data: any;
  address: any;
  open: boolean;
  id: any;
  getData: any;
  param: any;
  toggle!: boolean;
  rzp1: any
  onlinePayment: any;
  options: any
  pdid: any;

  totalprice: any;
  payment_id: any;
  order_id: any;
  signature: any;
  price: any;

  constructor(private PaymentService: PaymentService, private ProductshowService: ProductshowService, private toast: ToastrService, private router: Router, private OrderService: OrderService, private AddressService: AddressService, private ActivatedRoute: ActivatedRoute, private CartService: CartService) {
    this.open = false
    this.toggle = false
    this.param = this.ActivatedRoute.snapshot.params
    this.AddressService.getOne().subscribe({
      next: (e) => {
        this.address = e



      },
      error: (e) => {

      },
      complete: () => {

      }
    })
    this.AddressService.get().subscribe({
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

  paymentData(data: any) {
    console.log(data);
  }
  click() {
    this.toggle = true
  }

  online() {
    this.toggle = false
    if (this.param.id) {
      this.ProductshowService.getone(this.ActivatedRoute.snapshot.params).subscribe({
        next: (e) => {
          this.pdid = e._id
          this.price=e.price
          this.PaymentService.checkout(e.price).subscribe({
            next: (e) => {
              this.options = {
                key: "rzp_test_uZjWvI04f69P8M",
                amount: e.data.amount,
                currency: "INR",
                name: "Online Shop",
                description: "Test Transaction",
                image: "assets/img/logo.png",
                order_id: e.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: (response: any) => {
                  this.PaymentService.paymentVerify({ id: this.pdid, paymentType: 'online', qty: 1, address: this.address._id, payment_id: response.razorpay_payment_id, order_id: response.razorpay_order_id, signature: response.razorpay_signature, price: this.price, }).subscribe({
                    next: (e) => {
                      this.toast.success(e.message, '', {
                        positionClass: 'toast-bottom-center'
                      })
                      window.setTimeout(function () { location.pathname = '/' }, 1000)

                    },
                    error: (e) => {
                      this.toast.error('Payment cancel', '', {
                        positionClass: 'toast-bottom-center'
                      })
                      window.setTimeout(function () { location.reload() }, 1000)
                    }
                  })

                },
                prefill: {
                  "name": "Gaurav Kumar",
                  "email": "gaurav.kumar@example.com",
                  "contact": "9999999999"
                },
                notes: {
                  "address": "Razorpay Corporate Office"
                },
                theme: {
                  "color": "#676565"
                }
              };
              this.rzp1 = new this.PaymentService.nativeWindow.Razorpay(this.options);
              this.rzp1.open();
            },
            error: (e) => {

            }
          })
        },
        error: (e) => {

        }
      })

    } else {
      this.CartService.getAllProduct().subscribe({
        next: (e) => {
          this.totalprice = 0
          e.forEach((item: any) => {
            var price = item.productId.price
            var count = price * item.qty
            this.totalprice = this.totalprice + count
          })
          this.PaymentService.checkout(this.totalprice).subscribe({
            next: (e) => {
              this.options = {
                key: "rzp_test_uZjWvI04f69P8M",
                amount: e.data.amount,
                currency: "INR",
                name: "Online Shop",
                description: "Test Transaction",
                image: "assets/img/logo.png",
                order_id: e.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: (response: any) => {
                  this.CartService.getAllProduct().subscribe({
                    next:(e)=>{
                      e.map((item: any) => {
                        var price = item.productId.price
                        var totalPrice = price * item.qty
                        this.PaymentService.paymentCartVerify( {paymentType: 'online',payment_id: response.razorpay_payment_id, order_id: response.razorpay_order_id, signature: response.razorpay_signature, address: this.address._id, qty: item.qty, id: item.productId._id, totalprice: totalPrice }).subscribe({
                          next: (e) => {
                            this.toast.success('Order successfully created', '', {
                              positionClass: 'toast-bottom-center'
                            })
                            window.setTimeout(function () { location.pathname = '/' }, 1500)
                          },
                          error: (e) => {
                            this.toast.error(e.error.message, '', {
                              positionClass: 'toast-bottom-center'
                            })
                            window.setTimeout(function () { location.reload() }, 1500)
                          }
                        })


                      })
                    },
                    error:()=>{

                    }

                  })
                  this.payment_id = response.razorpay_payment_id,
                    this.order_id = response.razorpay_order_id
                  this.signature = response.razorpay_signature

                },
                prefill: {
                  "name": "Gaurav Kumar",
                  "email": "gaurav.kumar@example.com",
                  "contact": "9999999999"
                },
                notes: {
                  "address": "Razorpay Corporate Office"
                },
                theme: {
                  "color": "#676565"
                }
              };
              this.rzp1 = new this.PaymentService.nativeWindow.Razorpay(this.options);
              this.rzp1.open();


            },
            error: (e) => { }
          })

        },
        error: (e) => {

          }
      })

    }

  }


  payment(data: any) {
    if (this.param.id) {
      // console.log(this.ActivatedRoute.snapshot.params)
      this.ProductshowService.getone(this.ActivatedRoute.snapshot.params).subscribe({
        next: (e) => {
          this.OrderService.productBuy(data, { address: this.address._id, qty: 1, id: e._id, totalprice: e.price }).subscribe({
            next: (e) => {
              this.toast.success('Order successfully created', '', {
                positionClass: 'toast-bottom-center'
              })
              window.setTimeout(function () { location.pathname = '/' }, 1500)

            },
            error: (e) => {
              this.toast.error(e.error.message, '', {
                positionClass: 'toast-bottom-center'
              })
              window.setTimeout(function () { location.reload() }, 1500)
            }
          })
        },
        error: (e) => {

        }
      })

    } else {
      this.CartService.getAllProduct().subscribe({
        next: (e) => {

          e.map((item: any) => {
            var price = item.productId.price
            var totalPrice = price * item.qty

            this.OrderService.product(data, { address: this.address._id, qty: item.qty, id: item.productId._id, totalprice: totalPrice }).subscribe({
              next: (e) => {
                this.toast.success('Order successfully created', '', {
                  positionClass: 'toast-bottom-center'
                })
                window.setTimeout(function () { location.pathname = '/' }, 1500)
              },
              error: (e) => {
                this.toast.error(e.error.message, '', {
                  positionClass: 'toast-bottom-center'
                })
                window.setTimeout(function () { location.reload() }, 1500)
              }

            })

          })



        },
        error: (e) => {


        }

      })
    }

    // console.log(e.target.value);




  }


  change() {
    this.open = true
  }
  addressChange(data: any) {
    this.AddressService.getSelect(data).subscribe({
      next: (e) => {
        window.location.reload()

      },
      error: (e) => {

      }
    })

  }

}
