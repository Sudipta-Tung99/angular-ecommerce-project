import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  token: any;
  httpOptions: { headers: HttpHeaders; };

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("x-token")
    this.httpOptions = {
      headers: new HttpHeaders({
        'auth': this.token,

      })
    };
  }

  product(idpd: any,data:any) {

    return this.http.post<any>("http://localhost:5000/order/new", {data:data,paymentType:idpd.paymentType}, this.httpOptions)
  }
  productBuy(idpd: any,data:any) {

    return this.http.post<any>("http://localhost:5000/order/newbuy", {data:data,paymentType:idpd.paymentType}, this.httpOptions)
  }

  getOrder(){
    return this.http.get<any>("http://localhost:5000/order/get", this.httpOptions)

  }
  deleteOrder(id:any){
    return this.http.delete<any>(`http://localhost:5000/order/delete/${id}`, this.httpOptions)

  }
}
