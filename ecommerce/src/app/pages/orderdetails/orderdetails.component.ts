import { ToastrService } from 'ngx-toastr';
import { OrderService } from './../../service/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {
  orderData: any;
  paymentStatus: any;

  constructor(private OrderService: OrderService, private toast: ToastrService) {

    this.OrderService.getOrder().subscribe({
      next: (e) => {
        this.orderData = e
        this.paymentStatus = e.paymentStatus
       





      },
      error: (e) => {

      }
    })
  }

  ngOnInit(): void {
  }

  cancel(data: any) {
    this.OrderService.deleteOrder(data).subscribe({
      next: (e) => {
        this.toast.warning(e, '', {
          positionClass: 'toast-bottom-center'
        })
        window.setTimeout(function () { location.reload() }, 1000)

      },
      error: (e) => {

      }
    })

  }

}
