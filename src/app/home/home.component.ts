import { Component } from '@angular/core';
import { ServiceItemComponent } from './service-item/service-item.component';
import { ImageCardComponent } from './image-card/image-card.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ServiceItemComponent, ImageCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
