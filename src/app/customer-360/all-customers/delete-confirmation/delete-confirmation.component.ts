import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {
buttons=false
  constructor(private dialog : MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DeleteConfirmationComponent>) { }

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
