import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private service: SharedService) { }
  loggedIn: boolean = false;
  subscription: Subscription = new Subscription;

  ngOnInit(): void {
    // Check status initially
    this.checkLoggedInStatus();
    this.subscription = this.service.getUpdate().subscribe
      (msg => {
        this.checkLoggedInStatus();
        console.log(msg.text);
      });
  }

  ngOnChanges(changes: SimpleChanges,): void {
    this.checkLoggedInStatus();
  }

  checkLoggedInStatus() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }
  }
  title = 'WebStore';

  logOut() {
    localStorage.removeItem("jwt");
    this.service.sendUpdate('User logged out')
    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
