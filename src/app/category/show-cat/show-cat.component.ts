import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-cat',
  templateUrl: './show-cat.component.html',
  styleUrls: ['./show-cat.component.css']
})
export class ShowDepComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  constructor(private service: SharedService, private snackBar: MatSnackBar) { }

  CategoryList: any = [];
  ModalTitle: string = '';
  ActivateAddEditCatComp: boolean = false;
  cat: any;

  CategorFilter: string = '';
  CategoryListWithoutFilter: any = [];
  config: any;

  subscription: Subscription = new Subscription;

  ngOnInit(): void {
    this.refreshCatList();
    this.subscription = this.service.getUpdate().subscribe
      (msg => {
        if(msg.text == 'Category modified.') {
          this.closebutton.nativeElement.click();
        }
      });
  }

  addClick() {
    this.cat = {
      categoryId: 0,
      categoryCode: '',
      categoryName: ''
    }
    this.ModalTitle = 'Add Category';
    this.ActivateAddEditCatComp = true;
  }

  editClick(item: any) {
    this.cat = item;
    this.ModalTitle = 'Edit Category';
    this.ActivateAddEditCatComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure?')) {
      this.service.deleteCategory(item.categoryId).subscribe(data => {
        this.snackBar.open('Category deleted successfully!.', 'Close', {
          duration: 3000
        });
        this.refreshCatList();
      });
    };
  }

  closeClick() {
    this.ActivateAddEditCatComp = false;
    this.refreshCatList();
  }

  refreshCatList() {
    this.service.getCategoryList().subscribe(data => {
      console.log(data)
      this.CategoryList = data;
      this.CategoryListWithoutFilter = data;
    });
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.CategoryList.count
    };
  }

  FilterFn() {
    var CategoryFilter = this.CategorFilter;
    this.CategoryList = this.CategoryListWithoutFilter.filter(function (el: any) {
      return el.categoryCode.toString().toLowerCase().includes(
        CategoryFilter.toString().trim().toLowerCase())
        ||
        el.categoryName.toString().toLowerCase().includes(
          CategoryFilter.toString().trim().toLowerCase())
    });
  }

  sortResult(prop: any, asc: boolean) {
    if (asc) {
      this.CategoryList = this.CategoryListWithoutFilter.sort((a: any, b: any) => (a[prop] < b[prop] ? -1 : 1));
    }
    else {
      this.CategoryList = this.CategoryListWithoutFilter.sort((a: any, b: any) => (a[prop] > b[prop] ? -1 : 1));
    }
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

}
