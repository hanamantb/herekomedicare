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
  deductible:any
  maxOOP:any
  drugDeductible:any
  keyBenefits:any=[];
  keyBenefitValue:any
  constructor(private route: Router) {
    // this.details= this.route.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
const detail = sessionStorage.getItem('plandetail')
    if (detail) {
      this.details = JSON.parse(detail);
    }
    let keyBenefits:[];
    keyBenefits = this.details.attributes['Key_Benefits']
    console.log(keyBenefits,'keyBenefits')
    for(const kb of keyBenefits){
      this.keyBenefitValue = kb;
      let array: any = {
        "apiParameter":this.keyBenefitValue.apiParameter,
        "displayValue":this.keyBenefitValue.displayValue,
        "attributeName":this.keyBenefitValue.attributeName
      }
      this.keyBenefits.push(array);      
    }
    this.keyBenefits.forEach((value:any) => {
        if(value.apiParameter === 'annual_deductible'){
          this.deductible = value.displayValue
        }
        if(value.apiParameter === 'maximum_oopc'){
          this.maxOOP = value.displayValue
        }
    })
  }
  closePlanDetails() {
    window.close();
  }

}
