import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  token: any;
  httpOptions: { headers: HttpHeaders; };

  constructor(private http:HttpClient) {
    this.token = localStorage.getItem("x-token")
    this.httpOptions = {
      headers: new HttpHeaders({
        'auth': this.token,

      })
    };
  }

  new(value:any){
    return this.http.post<any>("http://localhost:5000/address/new",value,this.httpOptions)
  }
  getOne(){
    return this.http.get<any>("http://localhost:5000/address/getOne",this.httpOptions)
  }
  get(){
    return this.http.get<any>("http://localhost:5000/address/get",this.httpOptions)
  }
  getSelect(data:any){
    return this.http.post<any>("http://localhost:5000/address/select",{id:data},this.httpOptions)
  }
}
