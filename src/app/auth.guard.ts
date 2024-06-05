import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from "@angular/core";
import {UserService} from "./services/user.service";

@Injectable({
  providedIn: 'root'
})
export class authGuard {
  constructor(private userService: UserService, private router: Router) {
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    if (!await this.userService.isAuthenticated()) {
      await this.router.navigate(['/login']);
    }
    return await this.userService.isAuthenticated();
  }
}
