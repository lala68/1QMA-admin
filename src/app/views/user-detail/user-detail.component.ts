import {Component} from '@angular/core';
import {WidgetsDropdownComponent} from "../widgets/widgets-dropdown/widgets-dropdown.component";
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  TextColorDirective
} from "@coreui/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent,
    ColComponent, CardHeaderComponent,],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  user: any;

  constructor(private router: Router) {
    this.user = this.router.getCurrentNavigation()?.extras?.state?.['user'];
    if(!this.user){
      this.router.navigate(['/users'])
    }
    console.log(this.user)
  }

}
