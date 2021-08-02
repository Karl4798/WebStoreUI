import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private service: SharedService, private snackBar: MatSnackBar) { }
  passwordsDoNotMatch: boolean = false;
  usernameAlreadyExists: boolean = false;

  ngOnInit(): void {
  }

  register(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.service.userRegister(credentials).subscribe((data: any) => {
      const error = data?.message;
      if (error != null) {
        if (error == 'Passwords do not match') {
          this.passwordsDoNotMatch = true;
        }
        else if (error == 'Username already exists') {
          this.usernameAlreadyExists = true;
        }
      }
      else {
        this.router.navigate(["login"]);
        this.snackBar.open('User registered successfully.', 'Close', {
          duration: 3000
        });
      }
    }, err => {
      console.log(err);
    });
  }

}
