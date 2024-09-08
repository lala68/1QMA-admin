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

  async postNewSettings(name: any, key: any, value: any, type: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/settings/add'), {
      name: name,
      key: key,
      value: value,
      type: type
    }, {headers: headers, withCredentials: true})
      .toPromise();
  }

  async updateSettings(id: any, value: any, type: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/settings/update'), {id: id, value: value, type: type}, {
      headers: headers,
      withCredentials: true
    })
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
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('name', data);
    formData.append('icon', icon);
    return this.http.post<any>(this.config.url('admin/categories/add'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async updateCategory(id: any, name: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('name', name);
    formData.append('id', id);
    formData.append('icon', icon);
    // if (!icon) {
    //   formData.delete('icon')
    // }
    return this.http.post<any>(this.config.url('admin/categories/update'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async deleteCategory(id: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/categories/delete'), {id: id}, {
      headers: headers,
      withCredentials: true
    })
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
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('name', data);
    formData.append('icon', icon);
    return this.http.post<any>(this.config.url('admin/accountTypes/add'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async updateAccountType(id: any, name: any, icon: any): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('name', name);
    formData.append('id', id);
    formData.append('icon', icon);
    if (!icon) {
      formData.delete('icon')
    }
    return this.http.post<any>(this.config.url('admin/accountTypes/update'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async deleteAccountType(id: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/accountTypes/delete'), {id: id}, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  getDashboard(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/dashboard'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

//  features
  getAllShopItems(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/shopItems'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async postNewShopItem(data: any, type: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('type', type);
    if (type == 'bundle') {
      formData.append('details[0][title]', data.featureTitle);
      formData.append('details[0][count]', data.featureCount);
      formData.append('details[1][title]', data.assetTitle);
      formData.append('details[1][count]', data.assetCount);
    } else {
      formData.append('details[title]', data.title);
      formData.append('details[count]', data.count);
    }
    formData.append('coinPrice[price]', data.coinPrice);
    formData.append('coinPrice[coin]', data.coinType);
    formData.append('realPrice', data.price);
    formData.append('description', data.description);
    formData.append('icon', icon);
    return this.http.post<any>(this.config.url('admin/shopItems/add'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async updateShopItem(data: any, id: any, type: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('id', id);
    formData.append('type', type);
    if (type == 'bundle') {
      formData.append('details[0][title]', data.featureTitle);
      formData.append('details[0][count]', data.featureCount);
      formData.append('details[1][title]', data.assetTitle);
      formData.append('details[1][count]', data.assetCount);
    } else {
      formData.append('details[title]', data.title);
      formData.append('details[count]', data.count);
    }
    formData.append('coinPrice[price]', data.coinPrice);
    formData.append('coinPrice[coin]', data.coinType);
    formData.append('realPrice', data.price);
    formData.append('description', data.description);
    formData.append('icon', icon);
    if (!icon) {
      formData.delete('icon')
    }
    return this.http.post<any>(this.config.url('admin/shopItems/update'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async deleteShopItem(id: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/shopItems/delete'), {id: id}, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async toggleShopItemActivation(id: any, active: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/shopItems/toggleActive'), {
      id: id,
      isActive: active
    }, {headers: headers, withCredentials: true})
      .toPromise();
  }


  getQuestions(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/registerQuestions'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async postNewQuestion(data: any, options: any = ''): Promise<any> {
    let headers = new HttpHeaders({});
    return this.http.post<any>(this.config.url('admin/registerQuestions/add'), {
      question: data.question,
      type: data.type,
      placeholder: data.placeholder,
      options: options
    }, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async updateQuestion(id: any, data: any, options: any = ''): Promise<any> {
    let headers = new HttpHeaders({});
    return this.http.post<any>(this.config.url('admin/registerQuestions/update'), {
      id: id,
      question: data.question,
      type: data.type,
      placeholder: data.placeholder,
      options: options
    }, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async deleteQuestion(id: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/registerQuestions/delete'), {id: id}, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  getCharities(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/charityCategories'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async postNewCharity(data: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('title', data);
    formData.append('activities', '');
    formData.append('icon', icon);
    return this.http.post<any>(this.config.url('admin/charityCategories/add'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async updateCharity(id: any, name: any, icon: any): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('title', name);
    formData.append('id', id);
    formData.append('icon', icon);
    if (!icon) {
      formData.delete('icon')
    }
    return this.http.post<any>(this.config.url('admin/charityCategories/update'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async deleteCharity(id: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/charityCategories/delete'), {id: id}, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }


  getBugReports(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/bugReports'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getBugTypes(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/bugTypes'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async postNewBugTypes(data: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('title', data);
    formData.append('activities', '');
    formData.append('icon', icon);
    return this.http.post<any>(this.config.url('admin/bugTypes/add'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async updateBugType(id: any, name: any, icon: any): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('title', name);
    formData.append('id', id);
    formData.append('icon', icon);
    if (!icon) {
      formData.delete('icon')
    }
    return this.http.post<any>(this.config.url('admin/bugTypes/update'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async deleteBugType(id: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/bugTypes/delete'), {id: id}, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }


}
