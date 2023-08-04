import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlanPresentComponent} from "./plan-present.component";
import {PlanPresentRoutingModule} from "./plan-present-routing.module";
import { PlanDetailsComponent } from './plan-details/plan-details.component';
import { PlanCompareComponent } from './plan-compare/plan-compare.component';




@NgModule({
  declarations: [
    PlanPresentComponent,
    PlanDetailsComponent,
    PlanCompareComponent
  ],
  imports: [
    CommonModule,
    PlanPresentRoutingModule
  ]
})
export class PlanPresentModule { }
