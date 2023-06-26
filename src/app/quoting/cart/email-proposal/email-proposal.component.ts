import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-email-proposal',
  templateUrl: './email-proposal.component.html',
  styleUrls: ['./email-proposal.component.css']
})
export class EmailProposalComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  navTocart(){
    this.route.navigate(['cart-home'])
  }
}
