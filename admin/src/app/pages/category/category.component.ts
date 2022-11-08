import { CategoryService } from './../../service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: any;
  message: any;
  status: string | undefined;
  errorMessage: any;

  constructor(private CategoryService: CategoryService) {
    this.CategoryService.getCategory().subscribe((data) => {
      this.category = data;
    })
  }

  ngOnInit(): void {
  }
  delete(id: any) {
    this.CategoryService.deleteCategory(id).subscribe({
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

  edit(id:any){
    console.log(id);

    // this.CategoryService.editCategory(id).subscribe({
    //   next: data => {
    //     this.status = 'Delete successful';
    //     window.location.reload();

    //   },
    //   error: error => {
    //     this.errorMessage = error.message;
    //     console.error('There was an error!', error);
    //   }
    // })
  }
}
