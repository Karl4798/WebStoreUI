import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private service: SharedService, private snackBar: MatSnackBar) { }
  invalidLogin: boolean = false;

  ngOnInit(): void {
  }

  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.service.userLogin(credentials).subscribe((data: any) => {
      const token = data.token;

      if (token != null) {
        console.log(token);
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        this.router.navigate(["/"]);
        this.service.sendUpdate('User logged in');
        this.snackBar.open('User logged in successfully.', 'Close', {
          duration:3000
        });
      }
      else {
        this.invalidLogin = true;
      }
    }, err => {
      console.log(err);
      this.invalidLogin = true;
    });
  }

}
