import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {PlanPresentComponent} from "./plan-present.component";
import {PlanDetailsComponent} from "./plan-details/plan-details.component";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',component:PlanPresentComponent
      },
    ])
  ],
  exports:[
    RouterModule
  ]
})
export class PlanPresentRoutingModule { }
