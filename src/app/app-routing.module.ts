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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
