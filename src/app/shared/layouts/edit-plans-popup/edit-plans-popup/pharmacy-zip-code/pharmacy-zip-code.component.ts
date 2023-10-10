import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'pharmacy-zip-code',
  templateUrl: './pharmacy-zip-code.component.html',
  styleUrls: ['./pharmacy-zip-code.component.css']
})
export class PharmacyZipCodeComponent implements OnInit {
  zipcode:any;
  buttons = false
  constructor(private route: Router,private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PharmacyZipCodeComponent>) { }

  ngOnInit(): void {
    
  }
  openPharmacyZip() {
    this.dialog.closeAll()   
    this.route.navigate(['add-pharmacy'])
  } 
  continue() {   
    this.dialog.closeAll()      
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
this.route.onSameUrlNavigation = 'reload';
this.route.navigate(['Plans'])
  }
}
