import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {
    
  }

  userdata(data:any){
    return this.http.post<any>("http://localhost:5000/user/register",data)
  }
  otp(otp:any,id:any){
    return this.http.post<any>(`http://localhost:5000/user/verify/${id}`,otp)
  }
  login(data:any){
    return this.http.post<any>("http://localhost:5000/user/login",data)
  }
}
