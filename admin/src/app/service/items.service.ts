import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor( private http: HttpClient) { }

posturl="http://localhost:5000/product/new";
geturl="http://localhost:5000/product/get";


  addcategory(data:any){
return this.http.post<any>(this.posturl,data)
  }

  getProduct(){
return this.http.get<any>(this.geturl)
  }
  deleteItem(id:any){
    return this.http.delete(`http://localhost:5000/product/delete/${id}`)
  }

  getone(item_id:any){
    const {id} = item_id;
    return this.http.get(`http://localhost:5000/product/getone/${id}`)

  }
  // updateItem(data:any,item_id:any){
  //   const {id} = item_id;
  //   return this.http.get(`http://localhost:5000/product/getone/${id}`,data)
  // }
}
