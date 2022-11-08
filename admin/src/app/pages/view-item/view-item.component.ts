import { ActivatedRoute } from '@angular/router';
import { ItemsService } from './../../service/items.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
item:any
  constructor(private ItemsService:ItemsService,private routerId:ActivatedRoute) {
    this.ItemsService.getone(this.routerId.snapshot.params).subscribe((data)=>{
      this.item=data;
    })
   }

  ngOnInit(): void {
  }

}
