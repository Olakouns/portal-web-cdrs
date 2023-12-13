import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-service-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './service-item.component.html',
  styleUrl: './service-item.component.scss'
})
export class ServiceItemComponent {
  @Input({required: true}) data : {
    url: string,
    title: string,
    description: string,
    icon: string,
    cssClass: string
  };
}
