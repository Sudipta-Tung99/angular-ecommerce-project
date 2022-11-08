import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  data: any;

  constructor(private UserService:UserService) {
    this.UserService.getuser().subscribe({
      next:(e)=>{
        this.data=e

      },
      error:()=>{

      }
    })
  }

  ngOnInit(): void {
  }

}
