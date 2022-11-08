import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  verify: any
  message!: string;
  error!: string;
  id: any;
  verifyOtp!: string;
  count: any
  limeleft: number;
  counter: any;
  errorData: any;
  token:any;
  decord:any;


  constructor(private UserService: UserService, private router: Router,private JwtHelper:JwtHelperService) {
    this.errorData = []
    this.count = 0;
    this.limeleft = 60
    function converSecond(s: any) {
      var min =Math.floor (s / 60)
      var second = s % 60
      return min + ":" + second;

    }
    converSecond(20)
    setInterval(() => {
      this.count++;
      this.counter = converSecond(this.limeleft - this.count)
    }, 1000)


  }

  ngOnInit(): void {
  }

  otpSubmit(value: any) {
    this.UserService.otp(value, this.id).subscribe({
      next: (e) => {
        localStorage.setItem('x-token',this.token);

        this.message = e.message

      },
      error: (e) => {
        this.error = e.error

      },
      complete: () => {
        this.verifyOtp = "complete"

      }
    })


  }

  onsubmit(value: any) {
    if(this.errorData){
      this.errorData = ['']
      }
    this.UserService.userdata(value).subscribe({
      next: (e) => {
        this.token = e.data
        this.decord =this.JwtHelper.decodeToken(this.token)
        this.id = (this.decord._id);


        this.message = e.message;



      },
      error: (e) => {


        e.error.map((item: any) => {
          var data = { [item.context.label]: item.message }

          this.errorData = { ...this.errorData, ...data }



        })



      },
      complete: () => {
        this.errorData=""
        console.log("complete");

      }

    })
  }

  click() {
    window.location.pathname="/"
  }



}
function floor(arg0: number) {
  throw new Error('Function not implemented.');
}

