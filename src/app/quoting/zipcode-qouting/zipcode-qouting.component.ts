import { Component, OnInit } from '@angular/core';
import {Route, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddDrugComponent} from "../add-drug/add-drug.component";
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-zipcode-qouting',
  templateUrl: './zipcode-qouting.component.html',
  styleUrls: ['./zipcode-qouting.component.css']
})
export class ZipcodeQoutingComponent implements OnInit {
  isChecked = true;
  constructor(private route:Router,public dialog: MatDialog,private offcanvasService: NgbOffcanvas) { }

  ngOnInit(): void {
  }

  drug() {
    this.route.navigate(['add-drugs'])
  }

  doctrs() {
    this.route.navigate(['doctors'])
  }
  navToPlans() {
    // this.route.navigate(['Plans'])
    console.log('checked---',this.isChecked)
    if (this.isChecked){
      this.dialog.open(AddDrugComponent,{
        autoFocus: false,
        maxHeight: '90vh',
        width:'140vh'
      })
    }else{
      this.route.navigate(['Plans'])
    }

  }

}
