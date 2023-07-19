import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.css']
})
export class ErrorPopupComponent implements OnInit {

  constructor(private dialoge : MatDialog) { }

  ngOnInit(): void {
  }

  close() {
    this.dialoge.closeAll()
  }
}
