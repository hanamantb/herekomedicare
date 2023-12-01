import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {CommonService} from "../../services/common.service";
import {SpinnerService} from "../../services/spinner.service";
import { PlansListPageComponent } from 'src/app/plan-present/plans-list-page/plans-list-page.component';
import {SharedService} from "../../services/shared.service";
@Component({
  selector: 'app-drug-cost',
  templateUrl: './drug-cost.component.html',
  styleUrls: ['./drug-cost.component.css']
})
export class DrugCostComponent implements OnInit {
  isButtonClicked = false;
  isRemoved = true;
  has_deductible: boolean = false;
  opened: boolean = false;
  panelOpenState = false;
  drugCostResponse: any;
  effYear:any;
  drugInfoList:any;
  retailCost:number = 0;
  costAfterDeductible:number = 0;
  costBeforeDeductible:number = 0;
  costInCoverageGap:number = 0;
  costAfterCoverageGap:number = 0;
  drugcosts:any=[];
  dcomparedList:any[]=[];
  drugsSize:any;
  planName:any;
  planType:any;
  drugsArray: any=[]
  lis:any;
  year:any;
  monthlypremium:any
  planID: any;
  npis: any = [];
  checkPDP: boolean = false
  frequency = [{
    name: 'Every month',
    values: 'FREQUENCY_30_DAYS'
  },
    {
      name: 'Every 2 months',
      values: 'FREQUENCY_60_DAYS'
    },
    {
      name: 'Every 3 months',
      values: 'FREQUENCY_90_DAYS'
    },
    {
      name: 'Every 6 months',
      values: 'FREQUENCY_180_DAYS'
    },
    {
      name: 'Every 12 months',
      values: 'FREQUENCY_360_DAYS'
    }]
  plan: any=[]
  cartArray: any =[];
  cartPlanIds: any=[];
  
  constructor(private route: Router,private commonservice: CommonService,
    private sharedService: SharedService,
    private spinner: SpinnerService) { }
 
    addToCart(isRemoved:Boolean) {      
      this.isButtonClicked = !this.isButtonClicked;
      const dataToSend = {
        keyCart:'',
        keyCartPlanIds:''
    };
      console.log('Add to cart this.isButtonClicked',this.isButtonClicked)
      if(isRemoved){
       this.isRemoved =!this.isRemoved
      const plan = sessionStorage.getItem('plan');
      // Your logic for adding to the cart goes here
      if(plan){
        this.plan = JSON.parse(plan);
        console.log('this.plan',this.plan)
        const cart = sessionStorage.getItem('cart')        
    if (cart) {
      this.cartArray = JSON.parse(cart);
    }
      this.cartArray.push(this.plan)
      this.sharedService.cartCount(this.cartArray.length);
      console.log('this.cartArray.length',this.cartArray.length)
      sessionStorage.setItem('cart', JSON.stringify(this.cartArray))
      dataToSend.keyCart = this.cartArray;           
            this.sharedService.cartCount(this.cartArray.length); 
            console.log('remove', this.cartArray.length)    
      const planIds = sessionStorage.getItem('cartPlanIds')    
    if(planIds){
      this.cartPlanIds=JSON.parse(planIds)
    }
      this.cartPlanIds.push(this.plan.planID)
      sessionStorage.setItem('cartPlanIds', JSON.stringify(this.cartPlanIds))   
      dataToSend.keyCartPlanIds = this.cartPlanIds;
     
        
    this.plan.cartAdded = true
        
      }
    }else {  
      this.isRemoved =!this.isRemoved   
      console.log('this.isButtonClicked ',this.isButtonClicked)
      const cart = sessionStorage.getItem('cart')
      if (cart) {
        this.cartArray.forEach((element: any, index: any) => {
          console.log('remove', element.planID)
          console.log('this.planID', this.planID)
          if (this.planID === element.planID) {
            console.log('splice cart plan')
            this.cartArray.splice(index, 1)
            sessionStorage.setItem('cart', JSON.stringify(this.cartArray))
            dataToSend.keyCart = this.cartArray;
            this.sharedService.cartCount(this.cartArray.length); 
            console.log('remove', this.cartArray.length)       
          }
        })
      }
      const planIds= sessionStorage.getItem('cartPlanIds') 
      if(planIds){  
        let planIdsArray: any[] = [];
        this.cartPlanIds=JSON.parse(planIds);
        this.cartPlanIds = planIdsArray.filter(item => item !==this.plan.planID)
        sessionStorage.setItem('cartPlanIds',JSON.stringify(this.cartPlanIds));
        dataToSend.keyCartPlanIds = this.cartPlanIds;
      }
      this.plan.cartAdded = false
    
    }
    window.postMessage(dataToSend, '*');
    console.log('dataToSend',dataToSend)
      // Set the property to true to disable the button
      
    }
  ngOnInit(): void {
  
    const spine = this.spinner.start()
    const cart = sessionStorage.getItem('cart')

    const currentDate = new Date();
    this.effYear= currentDate.getFullYear()   
    const planId = sessionStorage.getItem('planID')
    if(planId)
    this.planID = planId.replace(/"/g, '');
    if(cart){
      this.cartArray =JSON.parse(cart)      
      console.log('this.cartArray',this.cartArray)
      this.sharedService.cartCount(this.cartArray.length);
      this.cartArray.forEach((element: any, index: any) => {       
        if (this.planID === element.planID) {
          this.isButtonClicked = !this.isButtonClicked;
          this.isRemoved = !this.isRemoved;
        }
      })
    }
    const lis = sessionStorage.getItem('lis')
    if(lis)
    this.lis = lis.replace(/"/g, '');
    const year = sessionStorage.getItem('effectyear')
    if(year)
    this.year = year.replace(/"/g, '');
    const monthlypremium = sessionStorage.getItem('monthlypremium')
    if(monthlypremium)
    this.monthlypremium = monthlypremium.replace(/"/g, '');  
    const planName = sessionStorage.getItem('planName')
    if(planName)
    this.planName =planName.replace(/"/g, '');
    console.log('planName',this.planName)

    const planType = sessionStorage.getItem('planType')
    if(planType)
    this.planType = planType.replace(/"/g, '');
    console.log('planType',this.planType)
        
    if (sessionStorage.getItem('planType')=='PDP'){
      this.checkPDP = true;
    }
    console.log(this.checkPDP) //check if plan type is pdp or not

    const drugs = sessionStorage.getItem('drugs')
    let drugsArrayPayload: any[] = [];    
  if (drugs) {
      drugsArrayPayload = JSON.parse(drugs);
      this.drugsArray = JSON.parse(drugs);
      this.drugsSize=drugsArrayPayload.length
    }
    const pharmdata = sessionStorage.getItem('pharmdata')
    let pharmdataArray: any[]=[];
    if (pharmdata) {
      pharmdataArray = JSON.parse(pharmdata);
    }
    pharmdataArray.forEach((element:any) => {
      this.npis.push(element.npi);
    });
    console.log('this.npis',this.npis)
    this.updateApidrugs(drugsArrayPayload) 
    this.commonservice.drugCost(this.npis,drugsArrayPayload,this.lis,
        this.year,this.planID,this.monthlypremium).subscribe(response => {
      console.log('shdvhdrug-cost response',response.data)
      this.drugCostResponse = response.data
      console.log('this.drugCostResponse',this.drugCostResponse)
    this.drugInfoList=this.drugCostResponse.drugInfoList
    this.drugCompare(this.drugsArray)
    this.pharmacyDataUpdate(pharmdataArray,this.drugCostResponse.costs)
    }) 
    this.spinner.stop(spine)
  }

  drugCompare(drug:any){
console.log('drug',drug)
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
    console.log('drugCost',drugCost)
    for (const pharm of pharmData){

      const matchingCostItem = drugCost.find((costItem:any) => costItem.npi === pharm.npi || costItem.npi ==='');
console.log('matchingCostItem',matchingCostItem)
      if (matchingCostItem){
let array:any=
  {
    "npi":matchingCostItem.npi ,
    "drug_costs":matchingCostItem.drug_costs ,
    "estimated_monthly_costs": matchingCostItem.estimated_monthly_costs,
    "in_network": matchingCostItem.in_network,
    "phase_information":matchingCostItem.phase_information ,
    "estimated_yearly_total": matchingCostItem.estimated_yearly_total,
    "estimated_yearly__drug_planPremium_total": matchingCostItem.estimated_yearly__drug_planPremium_total,
    "preferred": matchingCostItem.preferred,
    "mail_order": matchingCostItem.mail_order,
    "ltc": matchingCostItem.ltc,
    "name":pharm.name,
    "retailCost": matchingCostItem.retailCost,
    "costBeforeDeductible": matchingCostItem.costBeforeDeductible, //added this for cost before deductible
    "costAfterCoverageGap": matchingCostItem.costAfterCoverageGap,
    "costAfterDeductible": matchingCostItem.costAfterDeductible,
    "costInCoverageGap": matchingCostItem.costInCoverageGap
  }

        this.drugcosts.push(array)
    }

  }
 
    console.log('drugcosts',this.drugcosts)

    console.log('has_deductible', this.drugcosts[0]?.drug_costs[0].has_deductible) //to check value
    this.has_deductible = this.drugcosts[0]?.drug_costs[0].has_deductible //storing value for has deductible
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
    window.close();
  }
  getMonthlyTotals(drugcost:any){
    console.log('getMonthlyTotals',drugcost)
    this.retailCost = drugcost.retailCost;
    this.costAfterCoverageGap = drugcost.costAfterCoverageGap;
    this.costInCoverageGap = drugcost.costInCoverageGap;
    this.costAfterDeductible = drugcost.costAfterDeductible;
    this.costBeforeDeductible = drugcost.costBeforeDeductible; //added this for cost before deductible
  }
  updateApidrugs(data: any) {
    console.log('data-----------', data)
    if (data !== undefined) {
      data.forEach((drugsObj: any) => {
        this.frequency.forEach((freobj: any) => {
          if (freobj.name === drugsObj.frequency) {
            drugsObj.frequency = freobj.values
          }
        })

      });
    }
  }
}
