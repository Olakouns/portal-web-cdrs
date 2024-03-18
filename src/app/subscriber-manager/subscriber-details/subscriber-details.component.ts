import {Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SubscriberUser} from "../../models/subscriber-user";
import {NgForOf, NgIf} from "@angular/common";
import {SERVICE_TYPE_MAP, ServiceTypeEnum} from "../../models/service-type.enum";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AddSubscriberComponent} from "../subscriber-list/add-subscriber/add-subscriber.component";
import {AddServiceDialogComponent} from "./add-service-dialog/add-service-dialog.component";
import {TLService} from "../../models/tlservice";
import {ConfirmationDialogComponent} from "./confirmation-dialog/confirmation-dialog.component";
import {ApiResponse} from "../../models/api-response";
import {DataService} from "../../services/data.service";
import {UserService} from "../../services/user.service";
import {Invoice} from "../../models/invoice";
import {CurrencyXOFPipe} from "../../pipes/currency-xof.pipe";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-subscriber-details',
  standalone: true,
  imports: [
    NgForOf,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CurrencyXOFPipe,
    NgIf,
    MatProgressSpinnerModule
  ],
  templateUrl: './subscriber-details.component.html',
  styleUrl: './subscriber-details.component.scss'
})
export class SubscriberDetailsComponent implements OnInit, OnChanges{
  @Input({required: true}) subscriber: SubscriberUser;

  public dialog: MatDialog = inject(MatDialog);
  currentInvoice: Invoice | null;
  isLoadingInvoice = false;

  constructor(private dataService: DataService, private userService: UserService) {
  }

  onAddServices(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialog = this.dialog.open(AddServiceDialogComponent, {
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: true
    });

    dialog.afterClosed().subscribe({
      next: (response: Array<TLService>) => {
        if (response) {
          this.subscriber.tlServices.push(...response);
        }
      }
    })
  }

  getServicesName(serviceType: ServiceTypeEnum) {
    return SERVICE_TYPE_MAP.find(s => s.value === serviceType)?.label;
  }

  isActivate() {
    return this.subscriber.tlServices.some(s => s.activated);
  }

  onRemoveServices(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialog = this.dialog.open(AddServiceDialogComponent, {
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: false
    });

    dialog.afterClosed().subscribe({
      next: (response: Array<TLService>) => {
        if (response) {
          for (let service of response) {
            let index = this.subscriber.tlServices.findIndex(s => s.serviceType === service.serviceType);
            if (index != -1) {
              this.subscriber.tlServices.splice(index, 1);
            }
          }
        }
      }
    })
  }

  onToggleUserState(isForSuspend = true, enterAnimationDuration = '250ms', exitAnimationDuration = '250ms') {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      width: '700px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        isSuspend: isForSuspend,
        value: this.isActivate()
      }
    });

    dialog.afterClosed().subscribe({
      next: (response: ApiResponse) => {
        if (response.statusCode == 200) {
          if (isForSuspend) {
            let bollData = !this.isActivate();
            for (let service of this.subscriber.tlServices) {
              service.activated = bollData;
            }
          } else {
            // todo : remove user here
            this.dataService.setReloadData(true);
          }
        }
      }
    })
  }

  onGenerateInvoice() {
    this.isLoadingInvoice = true;
    this.userService.generateInvoice(this.subscriber.phoneNumber).subscribe({
      next: (response: Invoice) => {
        this.isLoadingInvoice = false;
        this.currentInvoice = response;
        // console.log(response);
      },
      error: error => {
        //console.log(error);
        this.isLoadingInvoice = false;
      }
    });
  }

  onGenerateCDR() {
    this.isLoadingInvoice = true;
    this.userService.generateCdr({
      phoneNumber: this.subscriber.phoneNumber,
      imsi: this.subscriber.imsi,
      userType: this.subscriber.subscriberType
    }).subscribe({
      next: (response: ApiResponse) => {
        this.isLoadingInvoice = false;
      },
      error: error => {
        this.isLoadingInvoice = false;
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentInvoice = null;
  }
}
