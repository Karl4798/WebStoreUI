import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/shared.service';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-prod',
  templateUrl: './show-prod.component.html',
  styleUrls: ['./show-prod.component.css']
})

export class ShowProdComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  constructor(private service: SharedService, private snackBar: MatSnackBar, private datePipe: DatePipe) { }

  ProductList: any = [];
  ModalTitle: string = '';
  ActivateAddEditProdComp: boolean = false;
  ActivateImportProdComp: boolean = false;
  prod: any = null;
  subscription: Subscription = new Subscription;
  config: any;
  ProductFilter: string = '';
  ProductListWithoutFilter: any = [];
  PhotoUrl: string = '';

  ngOnInit(): void {
    this.PhotoUrl = this.service.PhotoUrl;
    this.refreshProdList();
    this.subscription = this.service.getUpdate().subscribe
      (msg => {
        if(msg.text == 'Product modified.'
        || msg.text == 'Product(s) imported.') {
          this.closebutton.nativeElement.click();
        }
      });
  }

  addClick() {
    this.ActivateImportProdComp = false;
    this.prod = {
      productId: 0,
      productCode: (this.datePipe.transform(new Date(), 'yyyyMM')) + '-' + this.getSequentialId(),
      productDescription: '',
      categoryName: '',
      price: 0.00,
      photoFileName: 'default.png'
    }
    this.ModalTitle = 'Add Product';
    this.ActivateAddEditProdComp = true;
  }

  importClick() {
    this.ModalTitle = 'Import Products';
    this.ActivateAddEditProdComp = false;
    this.ActivateImportProdComp = true;
  }

  editClick(item: any) {
    this.ActivateAddEditProdComp = true;
    this.ActivateImportProdComp = false;
    this.prod = item;
    this.ModalTitle = 'Edit Product';
  }

  deleteClick(item: any) {
    if (confirm('Are you sure?')) {
      this.service.deleteProduct(item.productId).subscribe(data => {
        this.snackBar.open('Product deleted successfully!.', 'Close', {
          duration: 3000
        });
        this.refreshProdList();
      });
    };
  }

  closeClick() {
    this.ActivateAddEditProdComp = false;
    this.ActivateImportProdComp = false;
    this.refreshProdList();
  }

  FilterFn() {
    var ProductFilter = this.ProductFilter;
    this.ProductList = this.ProductListWithoutFilter.filter(function (el: any) {
      return el.productCode.toString().toLowerCase().includes(
        ProductFilter.toString().trim().toLowerCase())
        ||
        el.productName.toString().toLowerCase().includes(
          ProductFilter.toString().trim().toLowerCase())
        ||
        el.categoryName.toString().toLowerCase().includes(
          ProductFilter.toString().trim().toLowerCase())
        ||
        el.productDescription.toString().toLowerCase().includes(
          ProductFilter.toString().trim().toLowerCase())
    });
  }

  refreshProdList() {
    this.service.getProdList().subscribe(data => {
      this.ProductList = data;
      this.ProductListWithoutFilter = data;
    });
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.ProductList.count
    };
  }

  getSequentialId() {
    var productId = this.ProductList.length + 1;
    return productId;
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

  sortResult(prop: any, asc: boolean) {
    if (asc) {
      this.ProductList = this.ProductListWithoutFilter.sort((a: any, b: any) => (a[prop] < b[prop] ? -1 : 1));
    }
    else {
      this.ProductList = this.ProductListWithoutFilter.sort((a: any, b: any) => (a[prop] > b[prop] ? -1 : 1));
    }
  }
}
