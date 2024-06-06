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
              private processHTTPMsgService: ProcessHttpMessageService,
              private generalService: GeneralService) {
  }

  getUsers(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.get<any>(this.config.url('admin/users'), {headers: headers})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async loginUser(data: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<any>(this.config.url('admin/login'), {
      email: data.email,
      password: data.password
    }, {headers: headers})
      .toPromise();
  }

  async toggleUserActivation(id: any, active: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<any>(this.config.url('admin/users/toggleActive'), {
      id: id,
      active: active
    }, {headers: headers})
      .toPromise();
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await Preferences.get({key: 'account'});
    console.log(user)
    if (user.value != null) {
      this.generalService.userId = (user.value);
      this.isLoggedIn = true;
    }
    return !!user.value;
  }
}
