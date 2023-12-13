import { Component, Input, OnInit } from '@angular/core';
import { SubscriberUser } from '../../../models/subscriber-user';
import { InitialesPipe } from '../../../pipes/initiales.pipe';

@Component({
  selector: 'app-subscriber-item',
  standalone: true,
  imports: [InitialesPipe],
  templateUrl: './subscriber-item.component.html',
  styleUrl: './subscriber-item.component.scss'
})
export class SubscriberItemComponent implements OnInit{
  @Input({required: true}) data : SubscriberUser;

  ngOnInit(): void {
    
  }

}
