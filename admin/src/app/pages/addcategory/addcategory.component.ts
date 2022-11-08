import { CategoryService } from './../../service/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  file!: File;
  val: any;
  error: any;
  message: any;
  constructor(private router: Router, private CategoryService: CategoryService) { }

  ngOnInit(): void {

  }



  filehandle(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit(event: any) {

    const formData = new FormData();
    formData.append('category_Image', this.file, this.file.name)
    formData.append('category_name', event.name)
    this.CategoryService.category(formData).subscribe({
      next: (v) => {
        console.log(v);

      },
      error: (e) => {
        this.error = e.error.message.message

      },
      complete: () => {
        if(this.error){
          this.error=""
          this.message=" Category Insert successfully"
        }
        this.message=" Category Insert successfully"
        
      }


    })



  }

}
