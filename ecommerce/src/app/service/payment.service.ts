import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

function _window() : any {
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  token: any;
  httpOptions: { headers: HttpHeaders; };
  get nativeWindow() : any {
    return _window();
 }
  constructor(private http:HttpClient ) {
    this.token = localStorage.getItem("x-token")
    this.httpOptions = {
      headers: new HttpHeaders({
        'auth': this.token,

      })
    };
   }

  checkout(amount:any){
    return this.http.post<any>("http://localhost:5000/order/checkout",{amount:amount})
  }
  paymentVerify(data:any){
    return this.http.post<any>("http://localhost:5000/order/paymentVerify",data,this.httpOptions)
  }
  paymentCartVerify(data:any){
    return this.http.post<any>("http://localhost:5000/order/paymentCartVerify",data,this.httpOptions)
  }
}
