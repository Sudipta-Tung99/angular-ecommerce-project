import { OrderService } from './../../service/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;
  orderData: any;

  constructor(private ActivatedRoute: ActivatedRoute, private OrderService: OrderService) {


    this.OrderService.getOne(this.ActivatedRoute.snapshot.params).subscribe({
      next: (e) => {
        this.orderData = e

      },
      error: () => {

      }
    })

  }

  ngOnInit(): void {
  }

  pdf(data:any) {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save(`${data}.pdf`)
        this.OrderService.getDeliveredRecipt(this.ActivatedRoute.snapshot.params).subscribe({
          next: (e) => {
            window.location.pathname='/order'
          },
          error: (e) => {

          }
        })
      },
      x:5,
      y:5
    })

  }

}
