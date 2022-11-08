import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  token: any;
  httpOptions: { headers: HttpHeaders; };

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem("x-token")
    this.httpOptions = {
      headers: new HttpHeaders({
        'auth': this.token,

      })
    }

   }
  get(){
    return this.http.get<any>("http://localhost:5000/order/getall",this.httpOptions)
  }
  getDelivered(data:any){
    const {id} = data
   return this.http.get<any>(`http://localhost:5000/order/getDelivered/${id}`,this.httpOptions)
  }
  getDeliveredRecipt(data:any){
    const {id} = data
   return this.http.get<any>(`http://localhost:5000/order/getDeliveredRecipt/${id}`,this.httpOptions)
  }
  getAllDelivered(){
    return this.http.get<any>('http://localhost:5000/order/getAllDelivered',this.httpOptions)
   }

   getOne(data:any){
    const {id} = data

    return this.http.get<any>(`http://localhost:5000/order/getone/${id}`,this.httpOptions)
   }

  //  getallAlredayDevivered(){
  //   return this.http.get<any>("http://localhost:5000/order/getAllAlreadyDelivered")
  //  }
}
