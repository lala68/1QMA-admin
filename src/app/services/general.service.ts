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
    let user = await Preferences.get({key: 'account'});
    if (user.value != null) {
      try {
        var testIfJson = JSON.parse(user.value);
        console.log(testIfJson)
        if (typeof testIfJson == "object") {
          //Json
          this.user = JSON.parse(user.value);
          this.userId = (this.user._id);
        } else {
          //Not Json
          this.user = (user.value);
          this.userId = (this.user._id);
        }
      } catch {
        this.user = (user.value);
        this.userId = (this.user._id);
      }
    }
  }

  saveToStorage(storageKey: any, value: any) {
    Preferences.set({
      key: storageKey,
      value: (value),
    });
  }
}
