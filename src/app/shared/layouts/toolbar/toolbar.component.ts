import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  number = 0
  constructor(private route: Router,private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.number$.subscribe((value) => {
      this.number = value;
    });
  }

  cart() {
    this.route.navigate(['cart-home'])
  }
  onLogout() {
    let s=this.sharedService.logout();
  }
}
