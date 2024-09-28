import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {ProcessHttpMessageService} from "./process-http-message.service";
import {catchError} from "rxjs/operators";
import {Preferences} from "@capacitor/preferences";
import {GeneralService} from "./general.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLoggedIn: any;
  users: any;

  constructor(private http: HttpClient,
              private config: ConfigService,
              private router: Router,
              private processHTTPMsgService: ProcessHttpMessageService,
              private generalService: GeneralService) {
  }

  getUsers(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/users'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError.bind(this.processHTTPMsgService)));
  }

  async loginUser(data: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<any>(this.config.url('admin/login'), {
      email: data.email,
      password: data.password
    }, {headers: headers, withCredentials: true})
      .toPromise();
  }

  async changePassword(data: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/updatePassword'), {
      id: this.generalService.user._id,
      currentPassword: data.currentPassword,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation
    }, {headers: headers, withCredentials: true})
      .toPromise();
  }

  async toggleUserActivation(id: any, active: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/users/toggleActive'), {
      id: id,
      active: active
    }, {headers: headers, withCredentials: true})
      .toPromise();
  }

  async logout(): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/logout'), {
      id: this.generalService.userId,
    }, {headers: headers, withCredentials: true})
      .toPromise();
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await Preferences.get({key: 'account'});
    if (user.value != null) {
      // this.generalService.user = JSON.parse(user.value);
      // this.generalService.userId = (this.generalService.user._id);
      // this.isLoggedIn = true;
      try {
        var testIfJson = JSON.parse(user.value);
        console.log(testIfJson)
        if (typeof testIfJson == "object") {
          //Json
          this.generalService.user = JSON.parse(user.value);
          this.generalService.userId = (this.generalService.user._id);
          this.isLoggedIn = true;
        } else {
          //Not Json
          this.generalService.user = (user.value);
          this.generalService.userId = (this.generalService.user._id);
          this.isLoggedIn = true;
        }
      } catch {
        this.generalService.user = (user.value);
        this.generalService.userId = (this.generalService.user._id);
      }
    }
    return !!user.value;
  }

  async forceToLoginAgain() {
    await Preferences.clear();
    await this.router.navigate(['/login']);
  }
}
