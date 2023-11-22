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
    const planTiles: { planId: any; additionalBenefits: any; monthlypremium:any; drugsCoveredCount:any; drugDetails: any;  }[] =[]
    if(planCompareData){
      this.plans = JSON.parse(planCompareData)
      
      this.plans.forEach((element:any) => {
        const plan = {
          planId:element.planID,
          additionalBenefits:element.attributes.Additional_Benefits,
          monthlypremium:element.monthlypremium,
          drugsCoveredCount:element.drugsCoveredCount,        
        optionalPackages:element.optional_benefits,
        npis:npiArray,
        drugDetails:this.drugsArray
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
  toggleChildCheckbox(pc: any): void {
    pc.isSelected = pc.attributesList.some((row: any) => row.isSelected);
  }

  toggleParentCheckbox(pc: any): void {
    pc.attributesList.forEach((row: any) => {
      row.isSelected = pc.isSelected;
    });
  }
}

