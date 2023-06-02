import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-quoting',
  templateUrl: './quoting.component.html',
  styleUrls: ['./quoting.component.css']
})
export class QuotingComponent implements OnInit {
  curentWorkStageId = 2;
  unCompleteWorkStageId = 2;
  constructor(private route:Router) { }

  ngOnInit(): void {

  }

  button1Active: boolean = true;
  button2Active: boolean = false;

  toggleButton1() {
    this.button1Active = !this.button1Active;
    this.button2Active = false; // Set the other button to inactive
  }

  toggleButton2() {
    this.button2Active = !this.button2Active;
    this.button1Active = false; // Set the other button to inactive
  }
}
