import {Injectable} from '@angular/core';
import {Preferences} from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  user: any;
  userId: any;
  token: any;

  constructor() {
  }

  async ngOnInit(): Promise<void> {
    await this.getUserData();
  }

  async getUserData(): Promise<any> {
    let token = await Preferences.get({key: 'accessToken'});
    if (token.value != null) {
      this.token = (token.value);
    }
    let b = await Preferences.get({key: 'account'});
    if (b.value != null) {
      this.user = JSON.parse(b.value);
      this.userId = (this.user._id);
    }
  }

  saveToStorage(storageKey: any, value: any) {
    Preferences.set({
      key: storageKey,
      value: (value),
    });
  }
}
