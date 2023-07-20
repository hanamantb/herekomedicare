import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.css']
})
export class ErrorPopupComponent implements OnInit {
buttons=false
  constructor(private dialog : MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ErrorPopupComponent>) { }

  ngOnInit(): void {
    this.buttons = this.data.buttons
  }

  close() {
    this.dialog.closeAll()
  }

  continue() {
this.dialogRef.close(true)
  }
}
