import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {ConfigService} from "./config.service";
import {ProcessHttpMessageService} from "./process-http-message.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient,
              private config: ConfigService,
              private processHTTPMsgService: ProcessHttpMessageService,) {
  }

  getAllSettings(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.get<any>(this.config.url('admin/settings'), {headers: headers})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async postNewSettings(name: any, key: any, value: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<any>(this.config.url('admin/settings/add'), {
      name: name,
      key: key,
      value: value
    }, {headers: headers})
      .toPromise();
  }

  async updateSettings(id: any, value: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<any>(this.config.url('admin/settings/update'), {id: id, value: value}, {headers: headers})
      .toPromise();
  }


  getCategories(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.get<any>(this.config.url('admin/categories'), {headers: headers})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async postNewCategory(data: any, icon: any = null): Promise<any> {
    const formData = new FormData();
    formData.append('name', data);
    formData.append('icon', icon);
    return this.http.post<any>(this.config.url('admin/categories/add'), formData)
      .toPromise();
  }

  async updateCategory(id: any, name: any, icon: any = null): Promise<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('id', id);
    formData.append('icon', icon);
    // if (!icon) {
    //   formData.delete('icon')
    // }
    return this.http.post<any>(this.config.url('admin/categories/update'), formData)
      .toPromise();
  }

  async deleteCategory(id: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<any>(this.config.url('admin/categories/delete'), {id: id}, {headers: headers})
      .toPromise();
  }

  getAccountTypes(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.get<any>(this.config.url('admin/accountTypes'), {headers: headers})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async postNewAccountType(data: any, icon: any = null): Promise<any> {
    const formData = new FormData();
    formData.append('name', data);
    formData.append('icon', icon);
    return this.http.post<any>(this.config.url('admin/accountTypes/add'), formData)
      .toPromise();
  }

  async updateAccountType(id: any, name: any, icon: any): Promise<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('id', id);
    formData.append('icon', icon);
    if (!icon) {
      formData.delete('icon')
    }
    return this.http.post<any>(this.config.url('admin/accountTypes/update'), formData)
      .toPromise();
  }

  async deleteAccountType(id: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post<any>(this.config.url('admin/accountTypes/delete'), {id: id}, {headers: headers})
      .toPromise();
  }

  getDashboard(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.get<any>(this.config.url('admin/dashboard'), {headers: headers})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
