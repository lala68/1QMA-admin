import {Injectable} from '@angular/core';
import {Preferences} from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  user: any;
  userId: any;

  constructor() {
  }

  async ngOnInit(): Promise<void> {
    await this.getUserData();
  }

  async getUserData(): Promise<any> {
    let b = await Preferences.get({key: 'account'});
    if (b.value != null) {
      console.log(JSON.parse(b.value));
      this.user = JSON.parse(b.value);
      this.userId = (this.user._id);
      console.log(this.userId)
    }
  }

  saveToStorage(storageKey: any, value: any) {
    Preferences.set({
      key: storageKey,
      value: (value),
    });
  }
}
