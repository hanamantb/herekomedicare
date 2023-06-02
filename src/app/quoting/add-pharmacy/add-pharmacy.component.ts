import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-pharmacy',
  templateUrl: './add-pharmacy.component.html',
  styleUrls: ['./add-pharmacy.component.css']
})
export class AddPharmacyComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  nav(){
    this.route.navigate(['Plans'])
  }
}
