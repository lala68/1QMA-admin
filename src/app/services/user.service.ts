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
}
