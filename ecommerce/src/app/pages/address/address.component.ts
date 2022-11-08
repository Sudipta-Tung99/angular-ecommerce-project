import { Router } from '@angular/router';
import { AddressService } from './../../service/address.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  errorData: any;
  errorev: any;

  constructor(private AddressService: AddressService ,private Router:Router) {
    this.errorData=[]

   }

  ngOnInit(): void {
  }

  data(value: any) {

    this.AddressService.new(value).subscribe({
      next: (e) => {

this.Router.navigate(['/payment'])


      },
      error: (e) => {
console.log(e);


      //  if (e.message) {
      //     this.errorData = e.error

      //   } else {

          e.error.map((item: any) => {
            var data = { [item.context.label]: item.message }
            this.errorData = { ...this.errorData, ...data }
          })
          setTimeout(function(){
            window.location.reload();
         }, 1000);


        // }



      },
      complete: () => { }

    })
  }
}
