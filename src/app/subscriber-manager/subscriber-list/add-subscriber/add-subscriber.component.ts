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
import {AsyncPipe} from "@angular/common";
import {SERVICE_TYPE_MAP} from "../../../models/service-type.enum";


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
    AsyncPipe],
  templateUrl: './add-subscriber.component.html',
  styleUrl: './add-subscriber.component.scss'
})
export class AddSubscriberComponent implements OnInit {

  options : Array<ServiceTypeList> = [...SERVICE_TYPE_MAP];
  filteredOptions: Observable<Array<ServiceTypeList>>;

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    imsi: ['', [Validators.required]],
    subscriberType: ['', [Validators.required]],
    tlServices: ['', [Validators.required]],
  });

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
    // console.log($event.option.value)
    // this.options = this.options.filter(option => option.label !== $event.option.value);
    // console.log(this.options)
    // this.launchFilter();
  }

  onSubmit() {
    console.log(this.form.value)
  }
}
