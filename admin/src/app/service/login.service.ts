import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  user(data:any){
   return this.http.post<any>("http://localhost:5000/user/login",data)
  }
}
