import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit {
  panelOpenState = false;
  details:any

  constructor(private route: Router) {
    // this.details= this.route.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
const detail = sessionStorage.getItem('plandetail')
    if (detail) {
      this.details = JSON.parse(detail);
    }
  }
  closePlanDetails() {
    window.close();
  }

}
