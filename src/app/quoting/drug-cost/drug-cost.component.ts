import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drug-cost',
  templateUrl: './drug-cost.component.html',
  styleUrls: ['./drug-cost.component.css']
})
export class DrugCostComponent implements OnInit {
  opened: boolean = false;
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
