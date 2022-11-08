import { OrderService } from './../../service/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivered',
  templateUrl: './delivered.component.html',
  styleUrls: ['./delivered.component.css']
})
export class DeliveredComponent implements OnInit {
  orderData: any;
  count!:Number

  constructor(private OrderService: OrderService) {
this.count=0
    this.OrderService.getAllDelivered().subscribe({
      next: (e) => {
        this.orderData = e
        console.log(e.length);
        //  this.count=e.length

      },
      error: (e) => {

      }
    })
  }

  ngOnInit(): void {
  }

}
