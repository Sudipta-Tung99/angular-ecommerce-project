import { ProtectedService } from './../../service/protected.service';
import { CartService } from './../../service/cart.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { red } from '@material-ui/core/colors';





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  @ViewChild('content') el!: ElementRef;

  authToken: any
  decord: any;
  close: boolean;
  bar: boolean;
  handaler: any;
  input: any
  count: any;

  searchValue: any



  constructor(private jwtHelper: JwtHelperService, private router: Router, private CartService: CartService, private protectData: ProtectedService) {
    this.CartService.count().subscribe((res) => {
      if (res.message == true) {
        this.count = res.data
      }

      // document.addEventListener("mousedown",(e)=>{
      //   // if(this.el.nativeElement)
      //   // this.close = false


      // })



    })
    this.close = false
    this.bar = false
    this.authToken = localStorage.getItem("x-token");

    this.decord = this.jwtHelper.decodeToken(this.authToken)
    this.handaler = function () {
      this.close = false
    }


    console.log(this.el);


  }

  ngOnInit(): void {
  }
  logout() {


    localStorage.removeItem("x-token")
    window.location.replace('/login')
    this.router.navigate(["/login"])
  }
  open() {
    this.close = !this.close
  }

  toggle() {
    this.bar = !this.bar
  }
  stop() {
    this.bar = false
  }
  head() {
    this.close = false
  }
  protect() {
    this.protectData.protect().subscribe({
      next: (e) => {
        if (e.message == true) {
          this.router.navigate(['/cart'])
          this.close = false
        }
      },
      error: (e) => {
        this.router.navigate(['/login'])
        this.close = false
      },
      complete: () => { }

    })
  }
  order(){
    window.location.pathname = '/order'
  }
  onSubmit(e:any){
    this.router.navigate(['/'])
    // console.log(e.key);\



  }
  search(){

    this.router.navigate(['/home',this.searchValue])
    this.close = false


  }
  

//   searchBtn(data:any){
// console.log(data);

//   }
}
