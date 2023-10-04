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
  primaryCareVisit:any
  specialistVisit:any
  preventiveCare:any
  officeVisits:any=[];
  officeVisitValue:any
  benifitAmbulance:any
  serviceUrgentCare:any
  emergencyCareCost:any
  emergencyService:any=[];
  emergencyServiceValue:any
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

    //office visits
    let officeVisits:[];
    officeVisits = this.details.attributes['Office_Visits']
    console.log(officeVisits,'officeVisits')
    for(const ov of officeVisits){
      this.officeVisitValue = ov;
      let array: any = {
        "apiParameter":this.officeVisitValue.apiParameter,
        "displayValue":this.officeVisitValue.displayValue,
        "attributeName":this.officeVisitValue.attributeName
      }
      this.officeVisits.push(array);      
    }
    console.log('this.officeVisits',this.officeVisits)
    this.officeVisits.forEach((value:any) => {
        if(value.apiParameter === 'primary_doctor_visit_cost'){
          this.primaryCareVisit = value.displayValue
        }
        if(value.apiParameter === 'specialist_doctor_visit_cost'){
          this.specialistVisit = value.displayValue
        }
        if(value.apiParameter === 'BENEFIT_PREVENTIVE_CARE'){
          this.preventiveCare = value.displayValue
        }
    })
    //emergency services
    //office visits
    let emergencyServices:[];
    emergencyServices = this.details.attributes['Emergency_Services']
    console.log(emergencyServices,'emergencyServices')
    for(const es of emergencyServices){
      this.emergencyServiceValue = es;
      let array: any = {
        "apiParameter":this.emergencyServiceValue.apiParameter,
        "displayValue":this.emergencyServiceValue.displayValue,
        "attributeName":this.emergencyServiceValue.attributeName
      }
      this.emergencyService.push(array);      
    }
    console.log('this.emergencyService',this.emergencyService)
    this.emergencyService.forEach((value:any) => {
        if(value.apiParameter === 'BENEFIT_AMBULANCE'){
          this.benifitAmbulance = value.displayValue
        }
        if(value.apiParameter === 'SERVICE_URGENT_CARE'){
          this.serviceUrgentCare = value.displayValue
        }
        if(value.apiParameter === 'emergency_care_cost'){
          this.emergencyCareCost = value.displayValue
        }
    })
  }
  closePlanDetails() {
    window.close();
  }

}
