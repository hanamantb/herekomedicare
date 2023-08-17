import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {ErrorDialogComponent} from '../general/error-dialog/error-dialog.component';
import {SuccessSnackbarComponent} from '../general/success-snackbar/success-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDisplayService {

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }


  showError(code?: any, title?: string, message?: string): MatDialogRef<ErrorDialogComponent> {

    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data : {
        code: code === '' || code === undefined ? 0 : code,
        title: title === '' || title === undefined ? 'Error Occured' : title,
        message: message === '' || message === undefined ? 'Something went wrong, Please try again after sometime!' :  message,
      }
    });
    return dialogRef;
  }

  hideError(ref: MatDialogRef<ErrorDialogComponent>): void {
    ref.close();
  }

  showSuccess(message?: string): MatSnackBarRef<SuccessSnackbarComponent> {
    const snackbarRef = this.snackBar.openFromComponent(SuccessSnackbarComponent, {
      duration: 5000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      panelClass: 'success-snackbar',
      data: {
        message: message === '' || message === undefined ? 'Task successfully completed!' : message,
      }
    });
    return snackbarRef;
  }
}
