import {Component, inject, OnInit} from '@angular/core';
import {SubscriberItemComponent} from './subscriber-item/subscriber-item.component';
import {SubscriberUser} from '../../models/subscriber-user';
import {SubscriberType} from '../../models/subscriber-type';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AddSubscriberComponent} from "./add-subscriber/add-subscriber.component";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {InitialesPipe} from "../../pipes/initiales.pipe";
import {LoaderSkeletonItemComponent} from "./loader-skeleton-item/loader-skeleton-item.component";
import {ServiceTypeEnum} from "../../models/service-type.enum";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-subscriber-list',
  standalone: true,
  imports: [SubscriberItemComponent, MatDialogModule, NgxSkeletonLoaderModule, InitialesPipe, LoaderSkeletonItemComponent],
  templateUrl: './subscriber-list.component.html',
  styleUrl: './subscriber-list.component.scss'
})
export class SubscriberListComponent implements OnInit {
  dummySubscriberList: Array<SubscriberUser> = new Array<SubscriberUser>();
  dummySubscriberListSearch : Array<SubscriberUser> = new Array<SubscriberUser>();

  isLoading = false;
  selectedSubscriber: SubscriberUser;
  userService: UserService = inject(UserService);

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getSubscribers();
  }

  getSubscribers() {
    this.userService.getSubscribers().subscribe({
      next: response => {
        this.dummySubscriberList = response.reverse();
        this.dummySubscriberListSearch = [...this.dummySubscriberList];
        this.isLoading = false;
      },
      error: HttpErrorResponse => {
        this.isLoading = false;
        //console.log("Some Error occur");
      }
    })
  }

  onSearch(searchText: string) {
    this.dummySubscriberListSearch = this.dummySubscriberList.filter(value => (
      value.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
      value.phoneNumber.includes(searchText) ||
      value.imsi.includes(searchText) ||
      value.subscriberType.includes(searchText.toUpperCase())
    ))
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialog  = this.dialog.open(AddSubscriberComponent, {
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialog.afterClosed().subscribe({
      next: (response: SubscriberUser) => {
        if (response){
          this.dummySubscriberList.unshift(response);
          this.dummySubscriberListSearch.unshift(response)
        }
      }
    })
  }

  onSubscriberSelected($event: SubscriberUser) {
    this.selectedSubscriber = $event;
  }
}
