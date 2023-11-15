import { Component, OnInit } from '@angular/core';
import { ConfirmCompareComponent } from '../../shared/layouts/confirm-compare/confirm-compare.component';
import { MatDialog } from "@angular/material/dialog";
import { CommonService } from 'src/app/services/common.service';
import {SpinnerService} from "../../services/spinner.service";

@Component({
  selector: 'app-plan-compare',
  templateUrl: './plan-compare.component.html',
  styleUrls: ['./plan-compare.component.css']
})
export class PlanCompareComponent implements OnInit {
  panelOpenState = false;
  details: any
  plans:any
  drugsArray: any;
  planCompare: any; 
  frequency = [{
    name: 'Every month',
    values: 'FREQUENCY_30_DAYS'
  },
    {
      name: 'Every 2 months',
      values: 'FREQUENCY_60_DAYS'
    },
    {
      name: 'Every 3 months',
      values: 'FREQUENCY_90_DAYS'
    },
    {
      name: 'Every 6 months',
      values: 'FREQUENCY_180_DAYS'
    },
    {
      name: 'Every 12 months',
      values: 'FREQUENCY_360_DAYS'
    }]
  stars: number[] = [0, 1, 2, 3, 4];
  constructor(private dialog: MatDialog,private commonservice: CommonService,
   private spinner: SpinnerService) { }

  ngOnInit(): void {
   const spine = this.spinner.start()
    const lis = sessionStorage.getItem('lis')
    const year = sessionStorage.getItem('effectyear')  
    const planCompareData = sessionStorage.getItem('planCompareData')
    const drugs = sessionStorage.getItem('drugs')
    const npis = sessionStorage.getItem('pharmacies')
    let npiArray: any[] = [];
   
    if (npis) {
      npiArray = JSON.parse(npis);
    }
    console.log(' A npiArray',npiArray)
    if(drugs){
      this.drugsArray =JSON.parse(drugs);
      this.updateApidrugs(this.drugsArray)
    }
    const planTiles: { planId: any; additionalBenefits: any; isOptionalPackages: { package1: string; package2: string; package3: string; package4: string; package5: string; }; drugDetails: any; drugCoverageAndCosts: { tier: string; remainingPremiumAndDrugsRetail: { pharmacyName: string; isInNetwork: string; premiumCost: string; }[]; }; }[] =[]
    if(planCompareData){
      this.plans = JSON.parse(planCompareData)
      
      this.plans.forEach((element:any) => {
        const plan = {
          planId:element.planID,
          additionalBenefits:element.attributes.Additional_Benefits,
          isOptionalPackages:{
            "package1": "false",
            "package2": "false",
            "package3": "false",
            "package4": "false",
            "package5": "false"
        },
        optionalPackages:element.optional_benefits,
        npis:npiArray,
        drugDetails:this.drugsArray,
        drugCoverageAndCosts:{
          "tier": "0",
          "remainingPremiumAndDrugsRetail": [
              {
                  "pharmacyName": "WINN DIXIE",
                  "isInNetwork": "true",
                  "premiumCost": "$0.0"
              },
              {
                  "pharmacyName": "WALGREENS #6385",
                  "isInNetwork": "true",
                  "premiumCost": "$0.0"
              }
          ]
      }
        }
        console.log('pcp element',element.attributes.Additional_Benefits)
        
        planTiles.push(plan);
      });
    }
    console.log('planTiles',planTiles)
    this.commonservice.planCompare(lis,
      year,planTiles).subscribe(response => {
        this.planCompare =response.data
        console.log('this.planCompare',this.planCompare)
        this.spinner.stop(spine)
  })
  }
  updateApidrugs(data: any) {
    console.log('data-----------', data)
    if (data !== undefined) {
      data.forEach((drugsObj: any) => {
        this.frequency.forEach((freobj: any) => {
          if (freobj.name === drugsObj.frequency) {
            drugsObj.frequency = freobj.values
          }
        })

      });
    }
  }
  openCompareConfirm() {
    window.print();
  }


}

