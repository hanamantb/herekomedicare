import { Component, OnInit } from '@angular/core';
import { ConfirmCompareComponent } from '../../shared/layouts/confirm-compare/confirm-compare.component';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-plan-compare',
  templateUrl: './plan-compare.component.html',
  styleUrls: ['./plan-compare.component.css']
})
export class PlanCompareComponent implements OnInit {
  panelOpenState = false;
  details: any
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openCompareConfirm() {
    this.dialog.open(ConfirmCompareComponent);
  }

}

