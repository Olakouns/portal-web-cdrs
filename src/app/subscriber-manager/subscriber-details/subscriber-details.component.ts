import {Component, Input} from '@angular/core';
import {SubscriberUser} from "../../models/subscriber-user";

@Component({
  selector: 'app-subscriber-details',
  standalone: true,
  imports: [],
  templateUrl: './subscriber-details.component.html',
  styleUrl: './subscriber-details.component.scss'
})
export class SubscriberDetailsComponent {
  @Input({required: true}) subscriber: SubscriberUser;
}
