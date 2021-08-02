import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'http://localhost:20379/api';
  readonly PhotoUrl = 'http://localhost:20379/Resources/Images/'
  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  getCategoryList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/categories', {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
  addCategory(val: any) {
    return this.http.post(this.APIUrl + '/categories', val, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
  updateCategory(val: any) {
    return this.http.put(this.APIUrl + '/categories/' + val.CategoryId, val, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
  deleteCategory(val: any) {
    return this.http.delete(this.APIUrl + '/categories/' + val, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }

  getProdList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/products', {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
  addProduct(val: any) {
    return this.http.post(this.APIUrl + '/products', val, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
  updateProduct(val: any) {
    return this.http.put(this.APIUrl + '/products/' + val.ProductId, val)
  }
  deleteProduct(val: any) {
    return this.http.delete(this.APIUrl + '/products/' + val, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }

  UploadPhoto(val: any) {
    return this.http.post(this.APIUrl + '/products/uploadimage', val)
  }

  ImportProducts(val: any) {
    return this.http.post(this.APIUrl + '/products/uploadproduct', val)
  }

  getAllActiveCategoryNames(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + '/categories/getallactivecategorynames/', {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }

  userLogin(val: any) {
    return this.http.post(this.APIUrl + "/user/authenticate", val, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }

  userRegister(val: any) {
    return this.http.post(this.APIUrl + "/user/register", val, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }

  sendUpdate(message: any) {
    this.subject.next({ text: message });
  }

  getUpdate(): Observable<any> {
    return this.subject.asObservable();
  }
}
