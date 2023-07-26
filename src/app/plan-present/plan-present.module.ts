import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlanPresentComponent} from "./plan-present.component";
import {PlanPresentRoutingModule} from "./plan-present-routing.module";
import { PlanDetailsComponent } from './plan-details/plan-details.component';




@NgModule({
  declarations: [
    PlanPresentComponent,
    PlanDetailsComponent
  ],
  imports: [
    CommonModule,
    PlanPresentRoutingModule
  ]
})
export class PlanPresentModule { }
