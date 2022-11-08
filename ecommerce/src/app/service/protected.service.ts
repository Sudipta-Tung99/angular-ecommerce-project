import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProtectedService {
  token: any;
  httpOptions: { headers: HttpHeaders; };

  constructor( private http:HttpClient) {
    this.token = localStorage.getItem("x-token")
    this.httpOptions = {
      headers: new HttpHeaders({
        'auth': this.token,

      })
    };
   }
  protect(){
    return this.http.get<any>("http://localhost:5000/protect",this.httpOptions)
  }
}
