import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'confirm-compare',
  templateUrl: './confirm-compare.component.html',
  styleUrls: ['./confirm-compare.component.css']
})
export class ConfirmCompareComponent implements OnInit {
buttons=false
  constructor(private dialog : MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ConfirmCompareComponent>) { }

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
