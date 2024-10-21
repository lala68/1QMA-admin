import {Component} from '@angular/core';
import {
  ButtonCloseDirective, ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent, FormModule,
  RowComponent,
  TextColorDirective
} from "@coreui/angular";
import {Router, RouterModule} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GameService} from "../../services/game.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ReactiveFormsModule, FormModule,
    ColComponent, CardHeaderComponent, RouterModule, ButtonCloseDirective, ButtonDirective],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  user: any;
  userCoinForm: FormGroup;
  userInvitationForm: FormGroup;
  loadingSubmit: boolean = false
  error: any = '';

  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) {
    this.user = this.router.getCurrentNavigation()?.extras?.state?.['user'];
    console.log(this.user)
    this.userCoinForm = this.fb.group({
      coinType: ['', [Validators.required]],
      numberOfCoins: ['', [Validators.required]],
    });
    this.userInvitationForm = this.fb.group({
      numberOfInvitations: ['', [Validators.required]],
    });
    if (!this.user) {
      this.router.navigate(['/users'])
    }
  }

  submitAddCoin() {
    this.loadingSubmit = true;
    this.error = '';
    this.userService.addCoinUser(this.user._id, this.userCoinForm.controls['numberOfCoins'].value, this.userCoinForm.controls['coinType'].value).then(data => {
      this.loadingSubmit = false;
      if (data.status == 1) {
        this.router.navigate(['/users'])
      } else {
        this.error = data?.message;
      }
    })
  }

  submitAddInvitation() {
    this.loadingSubmit = true;
    this.error = '';
    this.userService.addInvitationUser(this.user._id, this.userInvitationForm.controls['numberOfInvitations'].value).then(data => {
      this.loadingSubmit = false;
      if (data.status == 1) {
        this.router.navigate(['/users'])
      } else {
        this.error = data?.message;
      }
    })
  }

}
