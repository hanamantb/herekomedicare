import { Component, OnInit } from '@angular/core';
import { ConfirmCompareComponent } from '../../shared/layouts/confirm-compare/confirm-compare.component';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-plan-compare',
  templateUrl: './plan-compare.component.html',
  styleUrls: ['./plan-compare.component.css']
})
export class PlanCompareComponent implements OnInit {
  panelOpenState = false;
  details: any
  plans:any
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    const lis = sessionStorage.getItem('lis')
    const year = sessionStorage.getItem('effectyear')  
    const planCompareData = sessionStorage.getItem('planCompareData')
    const planTiles = {

    }
    if(planCompareData){
      this.plans = JSON.parse(planCompareData)
      
      this.plans.forEach((element:any) => {
        console.log('pcp element',element.attributes.Additional_Benefits)
        element.attributes.Additional_Benefits.forEach((element:any) => {
          console.log('ab',element)
        });
        
      });
    }
    
  }
  openCompareConfirm() {
    window.print();
  }

}

