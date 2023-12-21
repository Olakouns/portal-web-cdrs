import {Component, OnInit} from '@angular/core';
import {
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
import {AsyncPipe, NgForOf} from "@angular/common";
import {SERVICE_TYPE_MAP} from "../../../models/service-type.enum";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {SubscriberType} from "../../../models/subscriber-type";


class ServiceTypeList {
  value : string;
  label : string;
  hasTargetNumber: boolean;
}
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
    AsyncPipe, NgForOf],
  templateUrl: './add-subscriber.component.html',
  styleUrl: './add-subscriber.component.scss'
})
export class AddSubscriberComponent implements OnInit {

  options : Array<ServiceTypeList> = [...SERVICE_TYPE_MAP];
  filteredOptions: Observable<Array<ServiceTypeList>>;
  subscriberTypes = SubscriberType;

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    imsi: ['', [Validators.required]],
    subscriberType: ['', [Validators.required]],
    tlServices: ['', [Validators.required]],
  });

  services : Array<ServiceTypeList> = [];

  constructor(public dialogRef: MatDialogRef<AddSubscriberComponent>, public formBuilder: FormBuilder) {
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
    console.log($event.option.value)
    let index = this.options.findIndex(option => option.label === $event.option.value);
    console.log(index)
    if (index != -1){
      this.services.push(this.options[index]);
      this.options.splice(index, 1);
      this.launchFilter();
      this.form.controls['tlServices'].setValue('');
    }
    // this.options = this.options.filter(option => option.label !== $event.option.value);
    // console.log(this.options)
    // this.launchFilter();
  }

  onSubmit() {
    console.log(this.form.value)
  }

  onRemoveItem(value : ServiceTypeList) {
    this.options.push(value);
    this.services = this.services.filter(service => service.label !== value.label);
    this.launchFilter();
  }
}
