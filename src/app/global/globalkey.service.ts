import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalkeyService {
  GlobalKeys;
  constructor() { 
    this.GlobalKeys = {
      best_buy_key: "7OxgnA1AnZmckv7PTeYsCYUz",
    }
  }
}
