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

@Component({
  selector: 'app-add-subscriber',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatInputModule, MatFormFieldModule],
  templateUrl: './add-subscriber.component.html',
  styleUrl: './add-subscriber.component.scss'
})
export class AddSubscriberComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddSubscriberComponent>) {
  }

  ngOnInit(): void {
  }

}
