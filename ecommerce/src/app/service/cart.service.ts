import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  httpOptions: { headers: HttpHeaders; };
  token: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("x-token")
    this.httpOptions = {
      headers: new HttpHeaders({
        'auth': this.token,

      })
    };

  }
  addNewItem(pdId: any) {

    return this.http.post<any>('http://localhost:5000/cart/add', pdId, this.httpOptions)


  }
  removeItem(pdId: any, id: any) {
    return this.http.post<any>('http://localhost:5000/cart/remove', pdId, this.httpOptions)
  }
  getAllProduct() {
    return this.http.get<any>('http://localhost:5000/cart/allCart', this.httpOptions)
  }
  count() {
    return this.http.get<any>('http://localhost:5000/cart/total', this.httpOptions)
  }
  remove(id: any) {
    return this.http.delete<any>(`http://localhost:5000/cart/delete/${id}`, this.httpOptions)

  }


}


