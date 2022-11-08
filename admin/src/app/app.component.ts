import { ToastrService } from 'ngx-toastr';
import { LoginService } from './service/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  token: any;
  // httpOptions: { headers: HttpHeaders; };
  open: any;
  httpOptions!: { headers: HttpHeaders; };

  constructor(private http: HttpClient, private LoginService: LoginService, private toast: ToastrService) {
    this.open = false
    this.token = localStorage.getItem("x-token")
    if (this.token) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'auth': this.token,

        })
      };
      this.http.get("http://localhost:5000/protectAdmin", this.httpOptions).subscribe({
        next: (e) => {
          this.open = true
        },
        error: (e) => {
          this.open = false
        }
      })
    }
    }
    userData(data: any) {
      this.LoginService.user(data).subscribe({
        next: (e) => {
          this.token = e
          this.httpOptions = {
            headers: new HttpHeaders({
              'auth': this.token,

            }),
          }
          this.http.get("http://localhost:5000/protectAdmin", this.httpOptions).subscribe({
            next: (e) => {
              this.open = true
              localStorage.setItem("x-token", this.token)
            },
            error: (e) => {
              console.log(e);

              this.toast.error(e.error, '', {
                positionClass: 'toast-bottom-center'
              })

            }
          })
          //     this.http.get("http://localhost:5000/protectAdmin",this.httpOptions).subscribe({
          //       next:(e)=>{
          // this.open=true
          //       },
          //       error:(e)=>{
          // this.open=false
          //       }
          //     })
          //   }
          //
        },
        error: (e) => {

        }

      })

    }
  }
