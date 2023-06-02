import { Component, OnInit } from '@angular/core';
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-browse-drug',
  templateUrl: './browse-drug.component.html',
  styleUrls: ['./browse-drug.component.css']
})
export class BrowseDrugComponent implements OnInit {
  alphabets: string[] = [];
  constructor(private offcanvasService: NgbOffcanvas) {
    const startChar = 'A'.charCodeAt(0);
    const endChar = 'Z'.charCodeAt(0);

    for (let i = startChar; i <= endChar; i++) {
      this.alphabets.push(String.fromCharCode(i));
    }
  }

  ngOnInit(): void {
  }

}
