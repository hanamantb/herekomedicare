import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cartItems=[]
  constructor(private route: Router) { }

  ngOnInit(): void {
    let cartArray: any[] = [];
const cart = sessionStorage.getItem('cart')
    if (cart) {
      this.cartItems = JSON.parse(cart);
    }
  }
  navTocart(){
    this.route.navigate(['cart-home'])
  }
}
