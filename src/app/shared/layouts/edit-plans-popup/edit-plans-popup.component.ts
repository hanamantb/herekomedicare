import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-plans-popup',
  templateUrl: './edit-plans-popup.component.html',
  styleUrls: ['./edit-plans-popup.component.css']
})
export class EditPlansPopupComponent implements OnInit {
  drugsArray:any;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    const drugs = sessionStorage.getItem('drugs')
    if (drugs) {
      this.drugsArray = JSON.parse(drugs);
    }
    console.log('drugggg',this.drugsArray)
  }

  close() {
    this.dialog.closeAll()
  }
}
