import {Component, Inject, inject, OnInit} from '@angular/core';
import {SERVICE_TYPE_MAP} from "../../../models/service-type.enum";
import {map, Observable, startWith} from "rxjs";
import {SubscriberType} from "../../../models/subscriber-type";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {ServiceTypeList} from "../../../models/service-type-list";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {TargetDialogComponent} from "../../subscriber-list/add-subscriber/target-dialog/target-dialog.component";
import {TLService} from "../../../models/tlservice";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DataService} from "../../../services/data.service";
import {SubscriberUser} from "../../../models/subscriber-user";

@Component({
  selector: 'app-add-service-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    AsyncPipe, NgForOf, NgIf, MatProgressSpinnerModule
  ],
  templateUrl: './add-service-dialog.component.html',
  styleUrl: './add-service-dialog.component.scss'
})
export class AddServiceDialogComponent implements OnInit {

  options: Array<ServiceTypeList> = [...SERVICE_TYPE_MAP];
  filteredOptions: Observable<Array<ServiceTypeList>>;
  subscriberTypes = SubscriberType;

  form = this.formBuilder.group({
    tlServices: [''],
  });

  services: Array<ServiceTypeList> = [];
  isLoading = false;
  userService: UserService = inject(UserService);
  currentSubscriber: SubscriberUser;

  title = "Add Services";

  constructor(public dialogRef: MatDialogRef<AddServiceDialogComponent>,
              public formBuilder: FormBuilder,
              public dialog: MatDialog,
              public dataService: DataService,
              @Inject(MAT_DIALOG_DATA) public isNew: boolean) {

    this.title = isNew ? "Ajouter services" : "Supprimer services";
    this.dataService.data$.subscribe(data => {
      if (data) {
        this.currentSubscriber = data;
        if (isNew) {
          for (let tlService of this.currentSubscriber.tlServices) {
            let index = this.options.findIndex(option => option.value === tlService.serviceType);
            if (index != -1) {
              this.options.splice(index, 1);
            }
          }
        } else {
          this.options = [];
          SERVICE_TYPE_MAP.forEach(value => {
            let index = this.currentSubscriber.tlServices.findIndex(service => service.serviceType === value.value);
            if (index != -1) {
              this.options.push(value);
            }
          });
        }

      }
    });
  }

  ngOnInit(): void {
    this.launchFilter();
  }

  private launchFilter() {
    this.filteredOptions = this.form.controls['tlServices'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): any {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.label.toLowerCase().includes(filterValue));
  }

  onSelectItems($event: MatAutocompleteSelectedEvent) {
    let index = this.options.findIndex(option => option.label === $event.option.value);
    if (index != -1) {
      if (this.options[index].hasTargetNumber) {
        // show a little dialog to get target number
        const dialog = this.dialog.open(TargetDialogComponent, {
          width: '400px'
        });

        dialog.afterClosed().subscribe({
          next: value => {
            if (value) {
              this.options[index].targetNumber = value;
              this.services.push(this.options[index]);
              this.options.splice(index, 1);
              this.launchFilter();
              this.form.controls['tlServices'].setValue('');
            }
          }
        })
      } else {
        this.services.push(this.options[index]);
        this.options.splice(index, 1);
        this.launchFilter();
        this.form.controls['tlServices'].setValue('');
      }
    }
  }

  onRemoveItem(value: ServiceTypeList) {
    this.options.push(value);
    this.services = this.services.filter(service => service.label !== value.label);
    this.launchFilter();
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.isLoading = true;
    if (this.form.invalid && this.services.length == 0) {
      // todo : show error message here
      return
    }

    let newService = new Array<TLService>();
    for (let serviceItem of this.services) {
      let tlService: TLService = new TLService();
      tlService.serviceType = serviceItem.value;
      tlService.activated = true;
      tlService.targetNumber = serviceItem.targetNumber ?? "";
      newService.push(tlService);
    }

    if (this.isNew) {
      this.userService.addServiceToSubscriber(this.currentSubscriber.phoneNumber, newService).subscribe({
        next: response => {
          this.dialogRef.close(newService);
        },
        error: HttpErrorResponse => {
          // TODO : Manage error here
        }
      });
    } else {
      this.userService.removeServiceFromSubscriber(this.currentSubscriber.phoneNumber, newService).subscribe({
        next: response => {
          this.isLoading = false;
          this.dialogRef.close(newService);
        },
        error: HttpErrorResponse => {
          this.isLoading = false;
          // TODO : Manage error here
        }
      });
    }


  }
}
