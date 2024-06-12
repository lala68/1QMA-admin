import {Component} from '@angular/core';
import {
  ButtonCloseDirective, ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormModule,
  RowComponent, ToastBodyComponent, ToastComponent, ToasterComponent, ToastHeaderComponent
} from "@coreui/angular";
import {GeneralService} from "../../services/general.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Preferences} from "@capacitor/preferences";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CardComponent, CardBodyComponent, RowComponent, ColComponent, CardHeaderComponent, ReactiveFormsModule,
    FormModule, ButtonCloseDirective, ButtonDirective, ToasterComponent, ToastComponent, ToastHeaderComponent, ToastBodyComponent,],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {
  changePasswordForm: FormGroup;
  loading: boolean = true;
  loadingSubmit: boolean = false;
  visible = false;
  position = 'top-end';
  message: any;

  constructor(public generalService: GeneralService, private fb: FormBuilder, private userService: UserService,
              private router: Router) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]]
    });
  }

  submitNewPass() {
    this.loadingSubmit = true;
    this.userService.changePassword(this.changePasswordForm.value).then(data => {
      this.loadingSubmit = false;
      if (data?.status == 1) {
        this.message = data?.message;
        this.userService.logout().then(async res => {
          await Preferences.clear();
          this.generalService.userId = '';
          this.userService.isLoggedIn = false;
          await this.router.navigate(['/login']);
        })
      } else {
        this.message = data?.message;
      }
      this.toggleToast();
    })
  }

  toggleToast() {
    this.visible = !this.visible;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
  }

}
