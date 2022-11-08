import { ItemsService } from './../../service/items.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
item:any
  status!: string;
  errorMessage: any;
  constructor(private ItemsService:ItemsService) {
    this.ItemsService.getProduct().subscribe((data)=>{
      this.item = data

    })
   }

  ngOnInit(): void {
  }

  deleteItem(id:any){
    this.ItemsService.deleteItem(id).subscribe({
      next: data => {
        this.status = 'Delete successful';
        alert(this.status)
        window.location.reload();

      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      }
    })

  }

}
