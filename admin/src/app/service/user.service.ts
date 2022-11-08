import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThreeSixtySharp } from '@material-ui/icons';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getuser(){
    return this.http.get("http://localhost:5000/user/getUser")
  }
}
