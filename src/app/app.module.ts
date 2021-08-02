import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth-guard/auth-guard.component';
import { RegisterComponent } from './register/register.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ShowProdComponent } from './product/show-prod/show-prod.component';
import { AddEditProdComponent } from './product/add-edit-prod/add-edit-prod.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { ShowDepComponent } from './category/show-cat/show-cat.component';
import { AddEditDepComponent } from './category/add-edit-cat/add-edit-cat.component';
import { DatePipe } from '@angular/common';
import { ImportProdComponent } from './import-prod/import-prod.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ShowDepComponent,
    AddEditDepComponent,
    ProductComponent,
    ShowProdComponent,
    AddEditProdComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ImportProdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MatSnackBarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:20379"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [SharedService,AuthGuard,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
