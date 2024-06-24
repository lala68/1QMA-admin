import {Component} from '@angular/core';
import {NgStyle} from '@angular/common';
import {IconDirective} from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective, FormModule
} from '@coreui/angular';
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GeneralService} from "../../../services/general.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective,
    CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective,
    IconDirective, FormControlDirective, ButtonDirective, NgStyle, FormModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  loadingSubmit: boolean = false;
  error: any = '';

  constructor(private userService: UserService, private fb: FormBuilder,
              private router: Router, private generalService: GeneralService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submitLogin() {
    this.error = '';
    this.loadingSubmit = true;
    this.userService.loginUser(this.loginForm.value).then(data => {
      this.loadingSubmit = false;
      if (data.status == 1) {
        this.generalService.saveToStorage('accessToken', data?.data.token);
        this.generalService.saveToStorage('account', JSON.stringify(data?.data?.user));
        this.generalService.userId = data?.data?._id;
        this.generalService.token = data?.data?.token;
        this.router.navigate(['dashboard']);
      } else {
        this.error = data.message;
      }
    })
  }

}
