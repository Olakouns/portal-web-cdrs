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
  servicesItems: Array<{
    url: string,
    title: string,
    description: string,
    icon: string,
    cssClass: string
  }> = [{
    url: "subscribers",
    title: "Gestion des abonnés",
    description: "Simplifiez la création et la gestion des abonnés pour offrir des services téléphoniques sans tracas",
    icon: "assets/g-subs.svg",
    cssClass: "action-card-color-p"
  },
  {
    url: "",
    title: "Gestion de la facturation",
    description: "Simplifiez la facturation pour une gestion financière en toute simplicité et tranquillité d'esprit.",
    icon: "assets/g-fac.svg",
    cssClass: "action-card-color-s"
  },
  {
    url: "",
    title: "CDR en Un Coup d'Œil",
    description: "Simplifiez la gestion des CDR (Call Detail Records) pour une vue claire et une analyse efficace de l'activité téléphonique",
    icon: "assets/g-cdrs.svg",
    cssClass: "action-card-color-p"
  }]
}
