import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorev: any;
  message: any;
  errorData: any;
  data: any;

  constructor(private UserService: UserService, private router: Router) {
    this.errorData = []
  }

  ngOnInit(): void {
  }


  onsubmit(data: any) {
    if (this.errorData) {
      this.errorData = ['']
    }
    this.UserService.login(data).subscribe({
      next: (e) => {
        localStorage.setItem('x-token',e);
        if(localStorage.getItem("x-token")){
        window.location.pathname = "/";
        }
      },
      error: (e) => {

        if (!e.error.Array) {
          this.errorev = e.error

        } else {
          e.error.map((item: any) => {
            var data = { [item.context.label]: item.message }


            this.errorData = { ...this.errorData, ...data }
          })

        }
      },
      complete: () => { }
    })

  }

}
