import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {DataService} from "../../../services/data.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {UserService} from "../../../services/user.service";
import {SERVICE_TYPE_MAP} from "../../../models/service-type.enum";
import {SubscriberUser} from "../../../models/subscriber-user";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiResponse} from "../../../models/api-response";

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent implements OnInit {

  isLoading = false;
  currentSubscriber: SubscriberUser;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              public formBuilder: FormBuilder,
              public dialog: MatDialog,
              public userService: UserService,
              public dataService: DataService,
              @Inject(MAT_DIALOG_DATA) public data: {
                isSuspend: boolean,
                value: boolean
              }) {

    this.dataService.data$.subscribe(data => {
      if (data) {
        this.currentSubscriber = data;
      }
    });
  }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

  onAccept() {
    this.isLoading = true;

    if (this.data.isSuspend){
      this.userService.suspendOrActivateSubscriber(this.currentSubscriber.phoneNumber, !this.data.value).subscribe({
        next: (response: ApiResponse) => {
          this.isLoading = false;
          this.dialogRef.close(response);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          // this.dialogRef.close(error);
        }
      })
    } else {
      this.userService.deleteSubscriber(this.currentSubscriber.phoneNumber).subscribe({
        next: (response: ApiResponse) => {
          this.isLoading = false;
          this.dialogRef.close(response);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          // this.dialogRef.close(error);
        }
      })
    }


  }
}
