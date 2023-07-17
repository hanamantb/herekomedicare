import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoadingSpinnerComponent} from "../shared/layouts/loading-spinner/loading-spinner.component";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private dialog:MatDialog) { }

  start(message?: string): MatDialogRef<LoadingSpinnerComponent> {

    const dialogRef = this.dialog.open(LoadingSpinnerComponent, {
      disableClose: true,
      data: message === '' || message === undefined ? 'Loading, Please wait..' : message
    });
    return dialogRef;
  }

  stop(ref: MatDialogRef<LoadingSpinnerComponent>): void {
    ref.close();
  }
}
