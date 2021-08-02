import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-prod',
  templateUrl: './add-edit-prod.component.html',
  styleUrls: ['./add-edit-prod.component.css']
})
export class AddEditProdComponent implements OnInit, OnChanges {

  constructor(private service: SharedService, private snackBar: MatSnackBar) { }

  @Input() prod: any;
  ProductId: number = -1;
  ProductCode: string = '';
  ProductName: string = '';
  ProductDescription: string = '';
  CategoryName: string = '';
  Price: number = 0.00;
  PhotoFileName: string = '';
  PhotoFilePath: string = '';

  CategoriesList: any = [];

  ngOnInit(): void {
    this.loadCategoriesList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadCategoriesList();
  }

  loadCategoriesList() {
    this.service.getAllActiveCategoryNames().subscribe(data => {
      this.CategoriesList = data;
      this.ProductId = this.prod.productId;
      this.ProductCode = this.prod.productCode;
      this.ProductName = this.prod.productName;
      this.ProductDescription = this.prod.productDescription;
      this.CategoryName = this.prod.categoryName;
      this.Price = this.prod.price;
      this.PhotoFileName = this.prod.photoFileName;
      this.PhotoFilePath = this.service.PhotoUrl + this.prod.photoFileName;
    });
  }

  addProduct() {
    var val = {
      ProductCode: this.ProductCode,
      ProductName: this.ProductName,
      ProductDescription: this.ProductDescription,
      CategoryName: this.CategoryName,
      Price: this.Price,
      PhotoFileName: this.PhotoFileName
    }
    this.service.addProduct(val).subscribe(res => {
      this.snackBar.open('Product created successfully!.', 'Close', {
        duration: 3000
      });
      this.service.sendUpdate('Product modified.');
    });
  }

  updateProduct() {
    var val = {
      ProductId: this.ProductId,
      ProductCode: this.ProductCode,
      ProductName: this.ProductName,
      ProductDescription: this.ProductDescription,
      CategoryName: this.CategoryName,
      Price: this.Price,
      PhotoFileName: this.PhotoFileName
    }
    this.service.updateProduct(val).subscribe(res => {
      this.snackBar.open('Product updated successfully!.', 'Close', {
        duration: 3000
      });
      this.service.sendUpdate('Product modified.');
    });
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);
    console.log(formData)
    this.service.UploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.fileName;
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    });
  }

}
