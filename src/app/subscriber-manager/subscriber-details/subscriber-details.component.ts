import {Component, Input} from '@angular/core';
import {SubscriberUser} from "../../models/subscriber-user";
import {NgForOf} from "@angular/common";
import {SERVICE_TYPE_MAP, ServiceTypeEnum} from "../../models/service-type.enum";

@Component({
  selector: 'app-subscriber-details',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './subscriber-details.component.html',
  styleUrl: './subscriber-details.component.scss'
})
export class SubscriberDetailsComponent {
  @Input({required: true}) subscriber: SubscriberUser;

  constructor() {
  }

  onAddServices(s: string, s2: string) {

  }

  getServicesName(serviceType: ServiceTypeEnum) {
    return SERVICE_TYPE_MAP.find(s => s.value === serviceType)?.label;
  }
}
