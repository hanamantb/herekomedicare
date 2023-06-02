import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlanPresentComponent} from "./plan-present.component";
import {PlanPresentRoutingModule} from "./plan-present-routing.module";




@NgModule({
  declarations: [
    PlanPresentComponent
  ],
  imports: [
    CommonModule,
    PlanPresentRoutingModule
  ]
})
export class PlanPresentModule { }
