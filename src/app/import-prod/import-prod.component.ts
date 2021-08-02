import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-import-prod',
  templateUrl: './import-prod.component.html',
  styleUrls: ['./import-prod.component.css']
})
export class ImportProdComponent implements OnInit {

  constructor(private service: SharedService, private snackBar: MatSnackBar) { }
  formData: any;
  fileName: any;

  ngOnInit(): void {
  }

  importProductsEvent(event: any) {
    var file = event.target.files[0];
    this.formData = new FormData();
    this.formData.append('uploadedFile', file, file.name);
    this.fileName = file.name;
  }

  importProducts() {
    this.service.ImportProducts(this.formData).subscribe((data: any) => {
      this.fileName = data.fileName;
      this.snackBar.open('Product imported successfully!.', 'Close', {
        duration: 3000
      });
      this.service.sendUpdate('Product(s) imported.');
    });
  }
}
