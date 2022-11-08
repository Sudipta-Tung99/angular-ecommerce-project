import { ItemsService } from './../../service/items.service';
import { CategoryService } from './../../service/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {
  category: any;
  file!: File
  error: any;
  message!: string;

  constructor(private CategoryService: CategoryService, private ItemsService: ItemsService) {
    this.CategoryService.getCategory().subscribe((data) => {
      this.category = data
    })
  }

  ngOnInit(): void {
  }

  fileHandle(data: any) {
    this.file = data.target.files[0];

  }

  onSubmit(data: any) {
    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("category", data.category)
    formData.append("stock", data.stock)
    formData.append("product", this.file, this.file.name)
    this.ItemsService.addcategory(formData).subscribe({
      next: (v) => {


      },
      error: (e) => {
        if(this.message){
          this.message='';
          this.error = e.error.message
        }
        this.error = e.error.message


      },
      complete: () => {
        if(this.error){
          this.error='';
          this.message = "Product Insert successful"
          alert(this.message)
        }
        this.message = "Product Insert successful"
        alert(this.message)
        window.location.reload()
        // this.router.navigate(['/category'])
      }
    })
  }
}
