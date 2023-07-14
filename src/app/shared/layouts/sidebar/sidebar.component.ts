import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDrawer, MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer', {static: true}) drawer!: MatSidenav;
  @Input() planCount!: string
  opened: boolean = false;
  panelOpenState = false;
  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  test(drawer: MatDrawer) {
    console.log('menu clicked inside sidebar');
    drawer.toggle();
  }
  navToPages(page:string){
    this.route.navigate([page])
  }
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + '';
    }

    return `${value}`;
  }
}
