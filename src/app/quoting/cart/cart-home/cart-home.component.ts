import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-cart-home',
  templateUrl: './cart-home.component.html',
  styleUrls: ['./cart-home.component.css']
})
export class CartHomeComponent implements OnInit {
  showmore: boolean = false
  benefits: boolean = false
  optnpkShow: boolean = false
  cpyShow: boolean = false
  emailProposal: boolean = false
  cartShow: boolean = false
  cartItems:any
  showDrugs:boolean =false;
  zipcode:any
  totalAmt:any=0
  stars: number[] = [1, 2, 3, 4, 5];
  today:Date = new Date();
  drugsArray: any;
  constructor(private route: Router,private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.zipcode = sessionStorage.getItem('zipcode')
    this.zipcode += ' ' + sessionStorage.getItem('countie')
    let cartArray: any[] = [];
    const drugs = sessionStorage.getItem('drugs')
    if (drugs) {
      this.drugsArray = JSON.parse(drugs);
      if(this.drugsArray.length !== 0){
        console.log('this.drugsArray',this.drugsArray)
        this.showDrugs = !this.showDrugs
      }
    }
    const cart = sessionStorage.getItem('cart')
    if (cart) {
      this.cartItems = JSON.parse(cart);
      const cartItem = this.cartItems.map((element: any, index: any) => {
        return {
          ...element,
          selected: false
        };
      });
      this.cartItems= cartItem
    }
    this.totlAmtCaclc()
    console.log('caaaaaaaaaaaaart',this.cartItems)
  }
  selectItem(item: any): void {
    item.selected = true;
  }
  showMore(plan: any) {
    plan.showmore = true
  }

  showLess(plan: any) {
    plan.showmore = false
  }
  benefitShow() {
    this.benefits = !this.benefits
  }

  onMenuClicked() {
    console.log('menu clicked inside toolbar');
    // this.menuClicked.emit('');
  }

  showOp(plan:any) {
    plan.optnpkShow = !plan.optnpkShow
  }

  cart(plan:any) {
    plan.selected=true
    // this.route.navigate(['cart-home'])
  }

  navbutton(route:string){
    this.route.navigate([route])
  }

  cpyShowtog() {
    this.cpyShow = !this.cpyShow
    this.emailProposal=false
    this.cartShow=false
  }
  emailProposalShow() {
    this.emailProposal = !this.emailProposal
    this.cpyShow=false
    this.cartShow=false
  }
  cartTabShow() {
    this.cartShow = !this.cartShow
    this.cpyShow=false
    this.emailProposal=false
  }
  continueShopping() {
    this.route.navigate(['/Plans']);
  }


  f1() {
    window.open('../../../../assets/PlanCompare.pdf', '_blank');
  }
  totlAmtCaclc(){
    this.cartItems.forEach((element:any)=>{

      this.totalAmt += Number(element.monthlypremium)
    })
  }
  planDetail(plan: any) {
    sessionStorage.setItem('plandetail', JSON.stringify(plan));
    sessionStorage.setItem('planID', plan.planID)
    sessionStorage.setItem('logo', plan.logo)
    sessionStorage.setItem('planType', plan.planType)
    const newWindow = window.open('/plan-detail', '_blank');
    if (newWindow) {
      newWindow.postMessage({ data: plan }, '*');
    }
  }
  remove(plan:any) {
    if (!plan.selected) {
      const planIds= sessionStorage.getItem('cartPlanIds') 
      if(planIds){  
        let planIdsArray: any[] = []; 
        planIdsArray=JSON.parse(planIds);
        planIdsArray = planIdsArray.filter(item => item !==plan.planID)
        sessionStorage.setItem('cartPlanIds',JSON.stringify(planIdsArray));
      }
      this.cartItems.forEach((element: any, index: any) => {
        console.log('remove', element.planID)
        if (plan.planID === element.planID) {
          console.log('remove', element.monthlypremium)
          this.cartItems.splice(index, 1)
          sessionStorage.setItem('cart', JSON.stringify(this.cartItems))
          this.sharedService.cartCount(this.cartItems.length);
          this.totlAmtCaclc()
        }
      })
    }
  }


}
