import { Component } from '@angular/core';
import {MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-target-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatAutocompleteModule,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './target-dialog.component.html',
  styleUrl: './target-dialog.component.scss'
})
export class TargetDialogComponent {

  form = this.formBuilder.group({
    phoneNumber: ['', [Validators.required]],
  });
  constructor(public dialogRef: MatDialogRef<TargetDialogComponent>, public formBuilder: FormBuilder) {
  }

  onSubmit() {
    if (this.form.invalid){
        // log message here
    } else {
      this.dialogRef.close(this.form.value["phoneNumber"]);
    }
  }

  onClose() {
      this.dialogRef.close();
  }
}
