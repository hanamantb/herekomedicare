import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginModule} from "./login/login.module";
import {MedicareQuotingComponent} from "./medicare-quoting/medicare-quoting.component";
import {QuotingComponent} from "./quoting/quoting.component";
import {ZipcodeQoutingComponent} from "./quoting/zipcode-qouting/zipcode-qouting.component";
import {PrescriptionDrugsComponent} from "./quoting/prescription-drugs/prescription-drugs.component";
import {AddDrugComponent} from "./quoting/add-drug/add-drug.component";
import {AddPharmacyComponent} from "./quoting/add-pharmacy/add-pharmacy.component";
import {DoctorsComponent} from "./quoting/doctors/doctors.component";
import {DrugCostComponent} from "./quoting/drug-cost/drug-cost.component";
import {CartComponent} from "./quoting/cart/cart.component";
import {CartHomeComponent} from "./quoting/cart/cart-home/cart-home.component";
import { EmailProposalComponent } from "./quoting/cart/email-proposal/email-proposal.component";
import { PlanDetailComponent } from './quoting/plan-detail.component';


const routes: Routes = [
  // {
  //   path:'',loadChildren: ()=> import('./login/login.module').then(m=> LoginModule),
  // },
  {
    path:'med-qoute',component:MedicareQuotingComponent
  },
  {
    path:'',component:QuotingComponent
  },
  {
    path:'zip-code',component:ZipcodeQoutingComponent
  },
  {
    path:'Plans',component:PrescriptionDrugsComponent
  },
  {
    path:'add-drugs',component:AddDrugComponent
  },
  {
    path:'add-pharmacy',component:AddPharmacyComponent
  },
  {
    path:'doctors',component:DoctorsComponent
  },
  {
    path:'drug-cost',component:DrugCostComponent
  },
  {
    path:'cart',component:CartComponent
  },
  {
    path:'cart-home',component:CartHomeComponent
  },
  {
    path:'email-proposal',component:EmailProposalComponent
  },
  {
    path: 'plan-detail', component: PlanDetailComponent
  },
  // {
  //   path:'Plans',loadChildren: ()=> import('./plan-present/plan-present.module').then(m=> PlanPresentModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
