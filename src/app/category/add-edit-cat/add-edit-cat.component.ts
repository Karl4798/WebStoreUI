import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-cat',
  templateUrl: './add-edit-cat.component.html',
  styleUrls: ['./add-edit-cat.component.css']
})
export class AddEditDepComponent implements OnInit, OnChanges {

  constructor(private service: SharedService, private snackBar: MatSnackBar) { }
  @Input() cat: any;
  CategoryId: number = -1;
  CategoryCode: string = '';
  CategoryName: string = '';
  IsActive: boolean = false;
  categoryCode = new FormControl();

  ngOnInit(): void {
    this.refresh();
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {
    this.CategoryId = this.cat.categoryId;
    this.CategoryCode = this.cat.categoryCode;
    this.CategoryName = this.cat.categoryName;
    this.IsActive = this.cat.isActive;
  }

  addCategory() {
    var val = {
      CategoryId: this.CategoryId,
      CategoryCode: this.CategoryCode,
      CategoryName: this.CategoryName,
      IsActive: this.IsActive
    }
    this.service.addCategory(val).subscribe(res => {
      this.snackBar.open('Category added successfully!.', 'Close', {
        duration: 3000
      });
      this.service.sendUpdate('Category modified.');
    });
  }

  updateCategory() {
    var val = {
      CategoryId: this.CategoryId,
      CategoryCode: this.CategoryCode,
      CategoryName: this.CategoryName,
      IsActive: this.IsActive
    }
    this.service.updateCategory(val).subscribe(res => {
      this.snackBar.open('Category updated successfully!.', 'Close', {
        duration: 3000
      });
      this.service.sendUpdate('Category modified.');
    });
  }

}
