import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductshowService {
  geturl="http://localhost:5000/product/get"

  constructor(private http:HttpClient) { }
  getProduct(){
   return this.http.get<any>("http://localhost:5000/product/get")
  }
  getone(pd_id:any){
const {id} = pd_id;
    return this.http.get<any>(`http://localhost:5000/product/getone/${id}`)
  }
}
