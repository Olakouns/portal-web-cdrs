import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubscriberUser} from '../../../models/subscriber-user';
import {InitialesPipe} from '../../../pipes/initiales.pipe';
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-subscriber-item',
  standalone: true,
  imports: [InitialesPipe],
  templateUrl: './subscriber-item.component.html',
  styleUrl: './subscriber-item.component.scss'
})
export class SubscriberItemComponent implements OnInit {
  @Input({required: true}) data: SubscriberUser;

  constructor(private dataService : DataService) {
  }

  ngOnInit(): void {

  }

  onSelectedItem() {
    this.dataService.setData(this.data);
  }
}
