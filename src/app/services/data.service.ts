import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {SubscriberUser} from "../models/subscriber-user";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private dataSubject = new BehaviorSubject<SubscriberUser | null>(null); // Initialisez avec la valeur par défaut
  public data$: Observable<SubscriberUser | null> = this.dataSubject.asObservable();

  setData(newData: SubscriberUser) {
    this.dataSubject.next(newData);
  }
}
