import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

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
  cartItems:any
  zipcode:any
  totalAmt:any=0
  stars: number[] = [1, 2, 3, 4, 5];
  today:Date = new Date();
  constructor(private route: Router) {
  }

  ngOnInit(): void {
    this.zipcode = sessionStorage.getItem('zipcode')
    this.zipcode += ' ' + sessionStorage.getItem('countie')
    let cartArray: any[] = [];
    const cart = sessionStorage.getItem('cart')
    if (cart) {
      this.cartItems = JSON.parse(cart);
    }
    this.totlAmtCaclc()
    console.log('caaaaaaaaaaaaart',this.cartItems)
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

  cart() {
    this.route.navigate(['cart-home'])
  }

  navbutton(route:string){
    this.route.navigate([route])
  }

  cpyShowtog() {
    this.cpyShow = !this.cpyShow
  }
  f1() {
    window.open('../../../../assets/PlanCompare.pdf', '_blank');
  }
  totlAmtCaclc(){
    this.cartItems.forEach((element:any)=>{

      this.totalAmt += Number(element.monthlypremium)
    })
  }

  remove(plan:any){
    this.cartItems.forEach((element: any, index: any) => {
      console.log('remove',element.planID)
      if (plan.planID === element.planID) {
        console.log('remove',element.monthlypremium)
        this.cartItems.splice(index, 1)
        sessionStorage.setItem('cart', JSON.stringify(this.cartItems))
        this.totlAmtCaclc()
      }
    })
  }


}
