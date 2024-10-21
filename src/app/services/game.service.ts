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

  async updateCategory(id: any, name: any, active: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('name', name);
    formData.append('id', id);
    formData.append('isActive', active);
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

  async updateAccountType(id: any, name: any, active: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('name', name);
    formData.append('id', id);
    formData.append('isActive', active);
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(this.config.url('admin/dashboard'), {headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError.bind(this.processHTTPMsgService)));
  }


//  features
  getAllShopItems(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/shopItems'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError.bind(this.processHTTPMsgService)));
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

  async updateQuestion(id: any, data: any, options: any = '', active: any): Promise<any> {
    let headers = new HttpHeaders({});
    return this.http.post<any>(this.config.url('admin/registerQuestions/update'), {
      id: id,
      question: data.question,
      type: data.type,
      isActive: active,
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
      .pipe(catchError(this.processHTTPMsgService.handleError.bind(this.processHTTPMsgService)));
  }

  async postNewCharity(title: any, activities: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('title', title);
    // Append each activity as an object
    activities.forEach((activity: any, index: any) => {
      // Use square brackets to indicate an array item in FormData
      formData.append(`activities[${index}][title]`, activity.title);
    });
    formData.append('icon', icon);
    return this.http.post<any>(this.config.url('admin/charityCategories/add'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async updateCharity(id: any, data: any, active: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('neededFund', data.neededFund);
    formData.append('currency', data.currency);
    data.activities.forEach((activity: any, index: any) => {
      // Use square brackets to indicate an array item in FormData
      formData.append(`activities[${index}][title]`, activity.title);
      formData.append(`activities[${index}][neededFund]`, activity.neededFund);
      formData.append(`activities[${index}][currency]`, activity.currency);
      formData.append(`activities[${index}][isDefault]`, activity.isDefault);
    });
    formData.append('id', id);
    formData.append('icon', icon);
    formData.append('isActive', active);
    if (!icon) {
      formData.delete('icon')
    }
    return this.http.post<any>(this.config.url('admin/charityCategories/update'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async makeAsDefault(id: any): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post<any>(this.config.url('admin/charityCategories/makeAsDefault'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async makeAsDefaultActivity(id: any): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('id', id);
    return this.http.post<any>(this.config.url('admin/charityCategories/activity/makeAsDefault'), formData, {
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
      .pipe(catchError(this.processHTTPMsgService.handleError.bind(this.processHTTPMsgService)));
  }

  getBugTypes(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/bugTypes'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError.bind(this.processHTTPMsgService)));
  }

  async postNewBugTypes(category: any, subCategories: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('category', category);
    subCategories.forEach((subCategory: any, index: any) => {
      formData.append(`subCategories[${index}][title]`, subCategory.title);
    });
    formData.append('icon', icon);
    return this.http.post<any>(this.config.url('admin/bugTypes/add'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async updateBugType(id: any, data: any, active: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('category', data.category);
    data.subCategories.forEach((activity: any, index: any) => {
      // Use square brackets to indicate an array item in FormData
      formData.append(`subCategories[${index}][title]`, activity.title);
    });
    formData.append('id', id);
    formData.append('isActive', active);
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

  getFaqs(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/faqs'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError.bind(this.processHTTPMsgService)));
  }

  async postNewFaq(data: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    return this.http.post<any>(this.config.url('admin/faqs/add'), {
      question: data.question,
      answer: data.answer,
    }, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async updateFaq(id: any, data: any, active: any): Promise<any> {
    let headers = new HttpHeaders({});
    return this.http.post<any>(this.config.url('admin/faqs/update'), {
      question: data.question,
      answer: data.answer,
      id: id,
      isActive: active,
    }, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async deleteFaq(id: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/faqs/delete'), {id: id}, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }


  getSponsors(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.get<any>(this.config.url('admin/sponsors'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  async postNewSponsors(data: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('link', data.link);
    formData.append('icon', icon);
    return this.http.post<any>(this.config.url('admin/sponsors/add'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async updateSponsors(id: any, data: any, active: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('link', data.link);
    formData.append('id', id);
    formData.append('isActive', active);
    formData.append('icon', icon);
    return this.http.post<any>(this.config.url('admin/sponsors/update'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async deleteSponsors(id: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/sponsors/delete'), {id: id}, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  getPrivacy(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/faqs/privacyPolicies'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError.bind(this.processHTTPMsgService)));
  }

  async postPrivacy(data: any): Promise<any> {
    let headers = new HttpHeaders({});
    return this.http.post<any>(this.config.url('admin/faqs/updatePrivacyPolicies'), {
      ...data
    }, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  getTerms(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/faqs/termsOfService'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError.bind(this.processHTTPMsgService)));
  }

  async postTerms(data: any): Promise<any> {
    let headers = new HttpHeaders({});
    return this.http.post<any>(this.config.url('admin/faqs/updateTermsOfService'), {
      ...data
    }, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  getLeagues(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.get<any>(this.config.url('admin/survivalLeagues'), {headers: headers, withCredentials: true})
      .pipe(catchError(this.processHTTPMsgService.handleError.bind(this.processHTTPMsgService)));
  }

  async postNewLeague(data: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    formData.append('totalScore', data.totalScore);
    formData.append('totalGames', data.totalGames);
    formData.append('icon', icon);
    if (!icon) {
      formData.delete('icon')
    }
    return this.http.post<any>(this.config.url('admin/survivalLeagues/add'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async updateLeague(id: any, data: any, active: any, icon: any = null): Promise<any> {
    let headers = new HttpHeaders({});
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    formData.append('totalScore', data.totalScore);
    formData.append('totalGames', data.totalGames);
    formData.append('icon', icon);
    formData.append('id', id);
    formData.append('isActive', active);
    if (!icon) {
      formData.delete('icon')
    }
    return this.http.post<any>(this.config.url('admin/survivalLeagues/update'), formData, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }

  async deleteLeague(id: any): Promise<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',

    })
    return this.http.post<any>(this.config.url('admin/survivalLeagues/delete'), {id: id}, {
      headers: headers,
      withCredentials: true
    })
      .toPromise();
  }


}
