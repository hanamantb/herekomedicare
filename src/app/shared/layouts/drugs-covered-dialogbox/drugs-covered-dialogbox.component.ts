import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-drugs-covered-dialogbox',
  templateUrl: './drugs-covered-dialogbox.component.html',
  styleUrls: ['./drugs-covered-dialogbox.component.css']
})
export class DrugsCoveredDialogboxComponent implements OnInit {
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
