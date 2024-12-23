import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserService} from "./services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {

  constructor(private authService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      // If the user is logged in, redirect to the dashboard
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
