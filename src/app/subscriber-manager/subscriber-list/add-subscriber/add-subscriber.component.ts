import {Component, inject, OnInit} from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {SERVICE_TYPE_MAP, ServiceTypeEnum} from "../../../models/service-type.enum";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {SubscriberType} from "../../../models/subscriber-type";
import {UserService} from "../../../services/user.service";
import {SubscriberUser} from "../../../models/subscriber-user";
import {HttpErrorResponse} from "@angular/common/http";
import {TargetDialogComponent} from "./target-dialog/target-dialog.component";
import {TLService} from "../../../models/tlservice";
import {ServiceTypeList} from "../../../models/service-type-list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";



@Component({
  selector: 'app-add-subscriber',
  standalone: true,
  imports: [MatButtonModule,
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
    AsyncPipe, NgForOf, MatProgressSpinnerModule, NgIf],
  templateUrl: './add-subscriber.component.html',
  styleUrl: './add-subscriber.component.scss'
})
export class AddSubscriberComponent implements OnInit {

  options: Array<ServiceTypeList> = [...SERVICE_TYPE_MAP];
  filteredOptions: Observable<Array<ServiceTypeList>>;
  subscriberTypes = SubscriberType;

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    imsi: ['', [Validators.required]],
    subscriberType: ['', [Validators.required]],
    tlServices: [''],
  });

  services: Array<ServiceTypeList> = [];

  isLoading = false;
  userService: UserService = inject(UserService);

  constructor(public dialogRef: MatDialogRef<AddSubscriberComponent>, public formBuilder: FormBuilder, public dialog: MatDialog) {
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

  onSubmit() {
    this.isLoading = true;
    if (this.form.invalid && this.services.length == 0) {
      // todo : show error message here
      return
    }

    let user = new SubscriberUser();
    user.name = this.form.value["name"] ?? "";
    user.phoneNumber = this.form.value["phoneNumber"] ?? "";
    user.imsi = this.form.value["imsi"] ?? "";
    user.subscriberType = this.form.value["subscriberType"] ?? "";
    user.tlServices = new Array<TLService>();

    for (let serviceItem of this.services) {
      let tlService: TLService = new TLService();
      tlService.serviceType = serviceItem.value;
      tlService.activated = true;
      tlService.targetNumber = serviceItem.targetNumber ?? "";
      user.tlServices.push(tlService);
    }

    this.userService.createSubscriber(user).subscribe({
      next: response => {
        this.isLoading = false;
        this.dialogRef.close(user);
          // if (response.statusCode == 200){
          //   this.dialogRef.close(user);
          // }
      },
      error: HttpErrorResponse => {
        // show error here
        this.isLoading = false;
      }
    });
  }

  onRemoveItem(value: ServiceTypeList) {
    this.options.push(value);
    this.services = this.services.filter(service => service.label !== value.label);
    this.launchFilter();
  }

  onClose() {
    this.dialogRef.close();
  }
}
