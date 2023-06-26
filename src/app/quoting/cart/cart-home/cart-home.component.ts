import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

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

  // @Output() menuClicked = new EventEmitter();

  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }

  showMore() {
    this.showmore = !this.showmore
  }

  benefitShow() {
    this.benefits = !this.benefits
  }

  onMenuClicked() {
    console.log('menu clicked inside toolbar');
    // this.menuClicked.emit('');
  }

  showOp() {
    this.optnpkShow = !this.optnpkShow
    console.log('cli')
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
}
