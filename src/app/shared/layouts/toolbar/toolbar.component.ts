import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {SharedService} from "../../../services/shared.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  number = 0
  hideButton: boolean = false;

  constructor(private route: Router,private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.number$.subscribe((value) => {
      this.number = value;
    });
    this.loginEvble()
  }

  cart() {
    this.route.navigate(['cart-home'])
  }
  onLogout() {
    let s=this.sharedService.logout();
  }
  loginEvble(){
    this.route.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Check the current route
      console.log('urll--',event.url)
      this.hideButton = event.url === '/login';
    });
  }
}
