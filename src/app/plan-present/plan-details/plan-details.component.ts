import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit {
  contractId:any
  planId:any
  planIdDisplay:any
  segmentId:any
  panelOpenState = false;
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
  skilledNursing:any
  diagonaticTests:any
  facilityFees:any
  outPatientService:any=[];
  outPatientServiceValue:any  
  plan:any
  logo:any
  planType:any
  drugPlanDeductible: any;
  constructor(private route: Router,private commonservice: CommonService,) {
    // this.details= this.route.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {   
    const planId = sessionStorage.getItem('planID')
    this.planIdDisplay =planId
    const logo = sessionStorage.getItem('logo')
    if(logo){
      this.logo = logo;
    }
    const planType = sessionStorage.getItem('planType')
    if(planType){
      this.planType = planType;
    }
    console.log('this.planId',this.planId)
    if(planId){      
    const splitArray: string[] = planId.split('-');
    console.log('splitArray',splitArray)
    splitArray.forEach((element, index) => {
      if(index === 0){
        this.contractId =element
      }else if(index === 1){
        this.planId =element
      }else if(index === 2){
        this.segmentId =element
      }
    });
    const lis = sessionStorage.getItem('lis')
    const year = sessionStorage.getItem('effectyear')
    const urlParam  = {
      year:year,
      contract_id:this.contractId,
      plan_id:this.planId,
      segment_id:this.segmentId
    }
    this.commonservice.planDetails(lis,urlParam).subscribe((response) => {
      this.plan =response.data.plandetail
      console.log('plandetails api',this.plan)
      let keyBenefits:[];
    keyBenefits = this.plan.attributes['Key_Benefits']
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
          console.log('this.maxOOP',this.maxOOP)
        }
        if(value.apiParameter === 'drug_plan_deductible'){
          this.drugPlanDeductible = value.displayValue
        }
    })

    //office visits
    let officeVisits:[];
    officeVisits = this.plan.attributes['Office_Visits']
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
    let emergencyServices:[];
    emergencyServices = this.plan.attributes['Emergency_Services']
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
     //outpatient service
     let outPatientServices:[];
     outPatientServices = this.plan.attributes['Outpatient_Services']
     console.log(outPatientServices,'outPatientServices')
     for(const os of outPatientServices){
       this.outPatientServiceValue = os;
       let array: any = {
         "apiParameter":this.outPatientServiceValue.apiParameter,
         "displayValue":this.outPatientServiceValue.displayValue,
         "attributeName":this.outPatientServiceValue.attributeName
       }
       this.outPatientService.push(array);      
     }
     console.log('this.outPatientService',this.outPatientService)
     this.outPatientService.forEach((value:any) => {
         if(value.apiParameter === 'BENEFIT_OUTPATIENT_HOSPITAL'){
           this.facilityFees = value.displayValue
         }
         if(value.apiParameter === 'SERVICE_DIAGNOSTIC_TESTS'){
           this.diagonaticTests = value.displayValue
         }
         if(value.apiParameter === 'BENEFIT_SKILLED_NURSING_FACILITY'){
           this.skilledNursing = value.displayValue
         }
     })
    })
    }
    
  }
  
  closePlanDetails() {
    window.close();
  }

}
