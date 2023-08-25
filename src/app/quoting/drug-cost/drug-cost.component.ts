import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drug-cost',
  templateUrl: './drug-cost.component.html',
  styleUrls: ['./drug-cost.component.css']
})
export class DrugCostComponent implements OnInit {
  opened: boolean = false;
  panelOpenState = false;
  plan:any
  drugInfoList:any
  dcomparedList:any[]=[]
  constructor() { }

  ngOnInit(): void {
    let costArray: any[] = [];
    const cart = sessionStorage.getItem('drugcost')
    if (cart) {
      this.plan = JSON.parse(cart);
      this.drugInfoList=this.plan.drugInfoList
    }
    const drugs = sessionStorage.getItem('drugs')
    let drugsArray: any[] = [];
    if (drugs) {
      drugsArray = JSON.parse(drugs);
    }
    console.log('costArray',this.plan)
    console.log('drug',drugsArray)
    this.drugCompare(drugsArray)
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
        // // Update the fields in drugArray with values from matchingCostItem
        // drugItem.tier = matchingCostItem.tier;
        // drugItem.prior_auth = matchingCostItem.prior_auth;
        // drugItem.step_therapy = matchingCostItem.step_therapy;
        // drugItem.quantity_limit = matchingCostItem.quantity_limit;
        // drugItem.on_formulary = matchingCostItem.on_formulary;
        // drugItem.quantity_limit_amount = matchingCostItem.quantity_limit_amount;
        // drugItem.quantity_limit_days = matchingCostItem.quantity_limit_days;
        // drugItem.biosimilars = matchingCostItem.biosimilars;
      }
    }
    console.log('dcomparedList',this.dcomparedList)
  }

}
