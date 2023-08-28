import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-drug-cost',
  templateUrl: './drug-cost.component.html',
  styleUrls: ['./drug-cost.component.css']
})
export class DrugCostComponent implements OnInit {
  opened: boolean = false;
  panelOpenState = false;
  plan:any
  effYear:any
  drugInfoList:any
  drugcosts:any=[]
  dcomparedList:any[]=[]
  constructor(private route: Router) { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.effYear= currentDate.getFullYear()
    let costArray: any[] = [];
    const cart = sessionStorage.getItem('drugcost')
    if (cart) {
      this.plan = JSON.parse(cart);
      this.drugInfoList=this.plan.drugInfoList
      // this.drugcosts=this.plan.costs
    }
    const drugs = sessionStorage.getItem('drugs')
    let drugsArray: any[] = [];
    if (drugs) {
      drugsArray = JSON.parse(drugs);
    }
    const pharmdata = sessionStorage.getItem('pharmdata')
    let pharmdataArray: any[]=[];
    if (pharmdata) {
      pharmdataArray = JSON.parse(pharmdata);
    }
    console.log('pharmdataArray',pharmdataArray)
    console.log('drug',drugsArray)
    this.drugCompare(drugsArray)
    this.pharmacyDataUpdate(pharmdataArray,this.plan.costs)
  }

  drugCompare(drug:any){

    for (const drugItem of drug) {
      const matchingCostItem = this.drugInfoList.find((costItem:any) => costItem.ndc === drugItem.ndc);

      if (matchingCostItem) {
        let array:any={
          "ndc": matchingCostItem.ndc,
          "tier": matchingCostItem.tier,
          "prior_auth": matchingCostItem.prior_auth,
          "step_therapy": matchingCostItem.step_therapy,
          "quantity_limit": matchingCostItem.quantity_limit,
          "on_formulary": matchingCostItem.on_formulary,
          "quantity_limit_amount":  matchingCostItem.quantity_limit_amount,
          "quantity_limit_days": matchingCostItem.quantity_limit_days,
          "drugName": drugItem.drugName,
          "dosage": drugItem.dosage,
          "package": drugItem.package,
          "quantity": drugItem.quantity,
          "frequency": drugItem.frequency,
        }
        this.dcomparedList.push(array)
      }
    }
    console.log('dcomparedList',this.dcomparedList)
  }

  pharmacyDataUpdate(pharmData:any,drugCost:any){
    for (const pharm of pharmData){

      const matchingCostItem = drugCost.find((costItem:any) => costItem.npi === pharm.npi);

      if (matchingCostItem){
let array:any=
  {
    "npi":matchingCostItem.npi ,
    "drug_costs":matchingCostItem.drug_costs ,
    "estimated_monthly_costs": matchingCostItem.estimated_monthly_costs,
    "in_network": matchingCostItem.in_network,
    "phase_information":matchingCostItem.phase_information ,
    "estimated_yearly_total": matchingCostItem.estimated_yearly_total,
    "preferred": matchingCostItem.preferred,
    "mail_order": matchingCostItem.mail_order,
    "ltc": matchingCostItem.ltc,
    "name":pharm.name
  }

        this.drugcosts.push(array)
    }

  }
    console.log('drugcosts',this.drugcosts)

  }

  drugNameGetter(ndc:any){
    const data = this.dcomparedList.find((drug: any) => drug.ndc === ndc);
    // console.log('drugNameGetter',data)
    return data ? data.drugName : 'N/A'; // Return 'N/A' if drug not found
  }

  getMonthOnly(dateString: string): string {
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];

    const date = new Date(dateString);
    const monthIndex = date.getMonth();

    return months[monthIndex];
  }

  plansNav() {
    this.route.navigate(['/Plans'])
  }
}
