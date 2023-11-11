import { Component, OnInit } from '@angular/core';
import { ConfirmCompareComponent } from '../../shared/layouts/confirm-compare/confirm-compare.component';
import { MatDialog } from "@angular/material/dialog";
import { CommonService } from 'src/app/services/common.service';

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
  constructor(private dialog: MatDialog,private commonservice: CommonService) { }

  ngOnInit(): void {
    const lis = sessionStorage.getItem('lis')
    const year = sessionStorage.getItem('effectyear')  
    const planCompareData = sessionStorage.getItem('planCompareData')
    const drugs = sessionStorage.getItem('drugs')
    if(drugs){
      this.drugsArray =JSON.parse(drugs);
    }
    const planTiles: { planId: any; additionalBenefits: any; isOptionalPackages: { package1: string; package2: string; package3: string; package4: string; package5: string; }; drugDetails: any; drugCoverageAndCosts: { tier: string; remainingPremiumAndDrugsRetail: { pharmacyName: string; isInNetwork: string; premiumCost: string; }[]; }; }[] =[]
    if(planCompareData){
      this.plans = JSON.parse(planCompareData)
      
      this.plans.forEach((element:any) => {
        const plan = {
          planId:element.planID,
          additionalBenefits:element.attributes.Additional_Benefits,
          isOptionalPackages:{
            "package1": "true",
            "package2": "true",
            "package3": "true",
            "package4": "false",
            "package5": "false"
        },
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
        this.planCompare ={
          "planDetail":[
             {
                "planName":"HealthSun MediMax (HMO)(H5431-006-0)",
                "planId":"H5431-006-0",
                "planType":"PLAN_TYPE_MAPD",
                "monthlyPremium":"35.00"
             },
             {
                "planName":"AARP Medicare Advantage Choice Plan 2 (Regional PPO)(R0759-001-0)",
                "planId":"R0759-001-0",
                "planType":"PLAN_TYPE_MAPD",
                "monthlyPremium":"0.00"
             }
          ],
          "attributes":[
             {
                "category":"Key_Benefits",
                "displayOrder":1,
                "attribute":[
                   {
                      "planType":"1",
                      "apiParameter":"annual_deductible",
                      "attributeName":"Deductible",
                      "categoryOrderProposals":"1",
                      "attributeOrderProposals":"1",
                      "data":[
                         {
                            "displayValue":"$0"
                         },
                         {
                            "displayValue":"$0"
                         }
                      ]
                   },
                   {
                      "planType":"1",
                      "apiParameter":"maximum_oopc",
                      "attributeName":"Max OOP",
                      "categoryOrderProposals":"1",
                      "attributeOrderProposals":"2",
                      "data":[
                         {
                            "displayValue":"$0"
                         },
                         {
                            "displayValue":"$0"
                         }
                      ]
                   }
                ]
             },
             {
                "category":"Inpatient_Services",
                "displayOrder":2,
                "attribute":[
                   {
                      "planType":"1",
                      "apiParameter":"BENEFIT_INPATIENT_HOSPITAL",
                      "attributeName":"Inpatient Facility Fees",
                      "categoryOrderProposals":"2",
                      "attributeOrderProposals":"1",
                      "data":[
                         {
                            "displayValue":"$0 copay per stay"
                         },
                         {
                            "displayValue":"$0"
                         }
                      ]
                   }
                ]
             },
             {
                "category":"Additional_Benefits",
                "displayOrder":3,
                "attribute":[
                   {
                      "planType":"1",
                      "apiParameter":"transportation",
                      "attributeName":"Transportation",
                      "categoryOrderProposals":"3",
                      "attributeOrderProposals":"1",
                      "data":[
                         {
                            "displayValue":"true"
                         },
                         {
                            "displayValue":"false"
                         }
                      ]
                   },
                   {
                      "planType":"1",
                      "apiParameter":"emergency_response_device",
                      "attributeName":"Emergency Response Device",
                      "categoryOrderProposals":"3",
                      "attributeOrderProposals":"2",
                      "data":[
                         {
                            "displayValue":"true"
                         },
                         {
                            "displayValue":"true"
                         }
                      ]
                   },
                   {
                      "planType":"1",
                      "apiParameter":"home_safety_devices",
                      "attributeName":"Home Safety Devices & Modifications",
                      "categoryOrderProposals":"3",
                      "attributeOrderProposals":"3",
                      "data":[
                         {
                            "displayValue":"true"
                         },
                         {
                            "displayValue":"true"
                         }
                      ]
                   },
                   {
                      "planType":"1",
                      "apiParameter":"home_safety_devices",
                      "attributeName":"Home Safety Devices & Modifications",
                      "categoryOrderProposals":"3",
                      "attributeOrderProposals":"4",
                      "data":[
                         {
                            "displayValue":"true"
                         },
                         {
                            "displayValue":"true"
                         }
                      ]
                   },
                   {
                      "planType":"1",
                      "apiParameter":"vision_services",
                      "attributeName":"Vision",
                      "categoryOrderProposals":"3",
                      "attributeOrderProposals":"5",
                      "data":[
                         {
                            "displayValue":"true"
                         },
                         {
                            "displayValue":"true"
                         }
                      ]
                   },
                   {
                      "planType":"1",
                      "apiParameter":"dental_services",
                      "attributeName":"Dental",
                      "categoryOrderProposals":"3",
                      "attributeOrderProposals":"6",
                      "data":[
                         {
                            "displayValue":"true"
                         },
                         {
                            "displayValue":"true"
                         }
                      ]
                   },
                   {
                      "planType":"1",
                      "apiParameter":"hearing_services",
                      "attributeName":"Hearing",
                      "categoryOrderProposals":"3",
                      "attributeOrderProposals":"7",
                      "data":[
                         {
                            "displayValue":"true"
                         },
                         {
                            "displayValue":"true"
                         }
                      ]
                   },
                   {
                      "planType":"1",
                      "apiParameter":"otc_drugs",
                      "attributeName":"Over-The-Counter Drugs",
                      "categoryOrderProposals":"3",
                      "attributeOrderProposals":"8",
                      "data":[
                         {
                            "displayValue":"true"
                         },
                         {
                            "displayValue":"false"
                         }
                      ]
                   }
                ]
             }
          ]
       }
        console.log('this.planCompare',this.planCompare)
  })
  }
  openCompareConfirm() {
    window.print();
  }

}

