import { Router } from '@angular/router';
import { OrderService, } from './../../service/order.service';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {



  orderData: any;
 constructor(private OrderService: OrderService,private Router:Router) {
    this.OrderService.get().subscribe({
      next: (e) => {
        this.orderData = e

      },
      error: (e) => {

      }
    })
  }

  ngOnInit(): void {
  }
  delivery(data: any) {
    // console.log(data);
    // this.Router.navigate([`/pdf/${data}`])

    this.OrderService.getDelivered({id:data}).subscribe({
      next: (e) => {
        window.location.reload()
      },
      error: (e) => {

      }
    })


  }
  pdf(id:any){
    this.Router.navigate([`/pdf/${id}`])

  }


  refund(id:any){

    this.OrderService.getDelivered({id:id}).subscribe({
      next: (e) => {
        window.location.reload()
      },
      error: (e) => {

      }
    })

  }


}


