import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-qouting',
  templateUrl: './customer-qouting.component.html',
  styleUrls: ['./customer-qouting.component.css']
})
export class CustomerQoutingComponent implements OnInit {
  button1Active: boolean = true;
  button2Active: boolean = false;
  searchView=true
  textChange='MBI'
  constructor(private route :Router) { }

  ngOnInit(): void {
  }


  toggleButton1(label:string) {
    this.button1Active = !this.button1Active;
    this.button2Active = false;
    this.textChange=label
  }

  toggleButton2(label:string) {
    this.button2Active = !this.button2Active;
    this.button1Active = false;
    this.textChange=label
  }

  search(){
    this.searchView = false
  }

  navToPlans() {
    this.route.navigate(['Plans'])
  }
  drug() {
    this.route.navigate(['add-drugs'])
  }

  doctrs() {
    this.route.navigate(['doctors'])
  }
}
