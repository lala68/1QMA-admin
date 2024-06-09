import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {IconSetService} from '@coreui/icons-angular';
import {iconSubset} from './icons/icon-subset';
import {GeneralService} from "./services/general.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  title = '1QMA - Admin';

  constructor(
    private router: Router,
    private titleService: Title,
    private generalService: GeneralService,
    private userService: UserService,
    private iconSetService: IconSetService
  ) {
    this.titleService.setTitle(this.title);
    // iconSet singleton
    this.iconSetService.icons = {...iconSubset};
    this.starter().then((data) => {
      if (this.generalService.userId) {
        this.router.navigate(['dashboard'])
      } else {
        this.router.navigate(['login'])
      }
    });
  }


  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }

  async starter() {
    if (await this.userService.isAuthenticated()) {
      await this.generalService.getUserData();
    }
  }
}
