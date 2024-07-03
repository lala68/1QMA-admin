import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {ConfigService} from "./config.service";
import {ProcessHttpMessageService} from "./process-http-message.service";
import {GeneralService} from "./general.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient,
              private config: ConfigService,
              private generalService: GeneralService,
              private processHTTPMsgService: ProcessHttpMessageService,) {
  }

  getAllSettings(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/settings'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async postNewSettings(name: any, key: any, value: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/settings/add'), {
      name: name,
      key: key,
      value: value
    }, {headers: headers, withCredentials: true})
      .toPromise();
  }

  async updateSettings(id: any, value: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/settings/update'), {id: id, value: value}, {headers: headers, withCredentials: true})
      .toPromise();
  }


  getCategories(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/categories'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async postNewCategory(data: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({

    });
    const formData = new FormData();
    formData.append('name', data);
    formData.append('icon', icon);
    return this.http.post<any>(this.config.url('admin/categories/add'), formData, { headers: headers, withCredentials: true })
      .toPromise();
  }

  async updateCategory(id: any, name: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({

    });
    const formData = new FormData();
    formData.append('name', name);
    formData.append('id', id);
    formData.append('icon', icon);
    // if (!icon) {
    //   formData.delete('icon')
    // }
    return this.http.post<any>(this.config.url('admin/categories/update'), formData, { headers: headers, withCredentials: true })
      .toPromise();
  }

  async deleteCategory(id: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/categories/delete'), {id: id}, {headers: headers, withCredentials: true})
      .toPromise();
  }

  getAccountTypes(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/accountTypes'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async postNewAccountType(data: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({

    });
    const formData = new FormData();
    formData.append('name', data);
    formData.append('icon', icon);
    return this.http.post<any>(this.config.url('admin/accountTypes/add'), formData, { headers: headers, withCredentials: true })
      .toPromise();
  }

  async updateAccountType(id: any, name: any, icon: any): Promise<any> {
    let headers = new HttpHeaders({

    });
    const formData = new FormData();
    formData.append('name', name);
    formData.append('id', id);
    formData.append('icon', icon);
    if (!icon) {
      formData.delete('icon')
    }
    return this.http.post<any>(this.config.url('admin/accountTypes/update'), formData, { headers: headers, withCredentials: true })
      .toPromise();
  }

  async deleteAccountType(id: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/accountTypes/delete'), {id: id}, {headers: headers, withCredentials: true})
      .toPromise();
  }

  getDashboard(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/dashboard'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
