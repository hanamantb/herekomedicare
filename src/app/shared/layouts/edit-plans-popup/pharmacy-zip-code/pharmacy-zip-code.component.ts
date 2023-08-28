import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'pharmacy-zip-code',
  templateUrl: './pharmacy-zip-code.component.html',
  styleUrls: ['./pharmacy-zip-code.component.css']
})
export class PharmacyZipCodeComponent implements OnInit {
  buttons = false
  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PharmacyZipCodeComponent>) { }

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
