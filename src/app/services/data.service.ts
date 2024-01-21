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

  private reloadSubject = new BehaviorSubject<Boolean>(false); // Initialisez avec la valeur par défaut
  public reload$: Observable<Boolean> = this.reloadSubject.asObservable();

  setData(newData: SubscriberUser | null) {
    this.dataSubject.next(newData);
  }

  setReloadData(value: Boolean) {
    this.reloadSubject.next(value);
  }
}
