import {Component, OnInit} from '@angular/core';
import {SubscriberListComponent} from './subscriber-list/subscriber-list.component';
import {SubscriberDetailsComponent} from './subscriber-details/subscriber-details.component';
import {SubscriberUser} from "../models/subscriber-user";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-subscriber-manager',
  standalone: true,
  imports: [SubscriberListComponent, SubscriberDetailsComponent],
  templateUrl: './subscriber-manager.component.html',
  styleUrl: './subscriber-manager.component.scss'
})
export class SubscriberManagerComponent implements OnInit {

  currentSubscriber: SubscriberUser;
  subExist = false

  constructor(private dataService : DataService) {
    this.dataService.data$.subscribe(data => {
      if (data){
        this.subExist = true;
        this.currentSubscriber = data;
      } else {
        this.subExist = false;
      }
    });
  }

  ngOnInit(): void {
  }

}
