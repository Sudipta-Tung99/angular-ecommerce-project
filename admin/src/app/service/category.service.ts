import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
url='http://localhost:5000/category/new';
getUrl = "http://localhost:5000/category/get";


  constructor( private http: HttpClient) { }

  category(data:any){
    return this.http.post<any>(this.url,data)

  }

  getCategory(){
    return this.http.get<any>(this.getUrl)
  }
  deleteCategory(data:any){
return this.http.delete<any>(`http://localhost:5000/category/delete/${data}`)
  }

  getone(data:any){
    const {id}= data;
    return this.http.get<any>(`http://localhost:5000/category/getone/${id}`)

  }

  editCategory(data:any,c_id:any){
    const {id}= c_id
    return this.http.put<any>(`http://localhost:5000/category/update/${id}`,data)
  }

}
