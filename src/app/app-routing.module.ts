import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginModule} from "./login/login.module";
import {MedicareQuotingComponent} from "./medicare-quoting/medicare-quoting.component";
import {QuotingComponent} from "./quoting/quoting.component";
import {ZipcodeQoutingComponent} from "./quoting/zipcode-qouting/zipcode-qouting.component";
import {AddDrugComponent} from "./quoting/add-drug/add-drug.component";
import {AddPharmacyComponent} from "./quoting/add-pharmacy/add-pharmacy.component";
import {DoctorsComponent} from "./quoting/doctors/doctors.component";
import {DrugCostComponent} from "./quoting/drug-cost/drug-cost.component";
import {CartComponent} from "./quoting/cart/cart.component";
import {CartHomeComponent} from "./quoting/cart/cart-home/cart-home.component";
import {EmailProposalComponent} from "./quoting/cart/email-proposal/email-proposal.component";
import {PlanCompareComponent} from "./plan-present/plan-compare/plan-compare.component";
import { PlansListPageComponent } from './plan-present/plans-list-page/plans-list-page.component';
import { PlanDetailsComponent } from "./plan-present/plan-details/plan-details.component";
import { SavedProposalsComponent } from './quoting/saved-proposals/saved-proposals.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path:'login',loadChildren: ()=> import('./login/login.module').then(m=> LoginModule),
   },
  {
    path:'med-qoute',component:MedicareQuotingComponent
  },
  {
    path:'quoting',component:QuotingComponent
  },
  {
    path:'zip-code',component:ZipcodeQoutingComponent
  },
  {
    path:'Plans',component:PlansListPageComponent
  },
  {
    path: 'PlansList', component: PlansListPageComponent
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
    path:'plan-compare',component:PlanCompareComponent
  },  {
    path:'plan-detail',component:PlanDetailsComponent
  },
  {
    path: 'saved-proposals', component: SavedProposalsComponent
  }
  // {
  //   path:'Plans',loadChildren: ()=> import('./plan-present/plan-present.module').then(m=> PlanPresentModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
