import { CategoryService } from './../../service/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})

export class UpdateCategoryComponent implements OnInit {
  name: any
  img: any
  file!: File;
editCategory=new FormGroup({
  category_name: new FormControl(""),
  category_Image:new FormControl("")
})
  status!: string;
  error!: string;
  cate_img: any;


  constructor(private routeId: ActivatedRoute, private CategoryService: CategoryService, private route:Router) {
    this.CategoryService.getone(this.routeId.snapshot.params).subscribe((res) => {
      this.editCategory=new FormGroup({
        category_name: new FormControl(res['category_name']),
        category_Image:new FormControl(res['category_Image'])
      })
      this.cate_img = res.category_Image;



    })
  }

  ngOnInit(): void {
  }

  fileHandle(data: any) {
    this.file = data.target.files[0]
    var reader = new FileReader();
    reader.onload = (event:any)=>{
      this.cate_img=""
      this.img = event.target.result
    }
    reader.readAsDataURL(this.file)
  }

  onsubmit() {

    this.name = this.editCategory.value.category_name
    if(this.file){
      const formData = new FormData();
      formData.append("category_name",this.name);
      formData.append("category_Image",this.file);
      this.CategoryService.editCategory(formData,this.routeId.snapshot.params).subscribe({
        next: (v) => {

        },
          error: (e) => {
            if(this.status){
              this.status='';
              this.error = e.error.message
            }
            this.error = e.error.message


          },
          complete: () => {
            this.status = "Product Insert successful"
            alert(this.status)
            this.route.navigate(['/category'])
          }

      })
    }else{
      this.CategoryService.editCategory(this.editCategory.value,this.routeId.snapshot.params).subscribe({
        next: (v) => {

      },
        error: (e) => {
          if(this.status){
            this.status='';
            this.error = e.error.message
          }
          this.error = e.error.message


        },
        complete: () => {
          this.status = "category Update successful"
          alert(this.status)
          this.route.navigate(['/category'])
        }
      })

    }

  }


}
