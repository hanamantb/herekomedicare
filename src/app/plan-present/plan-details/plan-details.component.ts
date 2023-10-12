import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CommonService } from 'src/app/services/common.service';
import {SpinnerService} from "../../services/spinner.service";

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
  partBPremiumReduction:any
  standardPartBPremium:any
  partBPremium:any
  partB:any=[];
  partBValue:any 
  plan:any
  planDetail:any
  logo:any
  planType:any
  drugPlanDeductible: any;
  stars: number[] = [0, 1, 2, 3, 4];
  overAllStarRating: any;
  constructor(private route: Router,private commonservice: CommonService,
    private spinner: SpinnerService) {
    // this.details= this.route.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void { 
    const spine = this.spinner.start()  
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
      this.planDetail = response.data.plandetail
      this.plan =response.data.plandetail.attributes
      console.log('plandetails api',this.plan)      
    })
    }
    this.spinner.stop(spine)
  }
  
  closePlanDetails() {
    window.close();
  }

}
