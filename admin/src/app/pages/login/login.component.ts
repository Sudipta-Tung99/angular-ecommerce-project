import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  httpOptions: any;
  token: any;

  constructor( private http: HttpClient,) { }

  ngOnInit(): void {
  }


}
