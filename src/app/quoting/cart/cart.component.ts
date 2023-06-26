import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  navTocart(){
    this.route.navigate(['cart-home'])
  }
}
