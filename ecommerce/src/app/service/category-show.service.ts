import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryShowService {

  constructor( private http:HttpClient) { }
  getCategory(){
    return this.http.get<any>("http://localhost:5000/category/get")
  }
}
