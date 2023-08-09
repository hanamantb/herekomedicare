import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDrawer, MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('drawer', {static: true}) drawer!: MatSidenav;
  @Input() planCount!: string
  @Input() totalCount!: string
  opened: boolean = false;
  panelOpenState = false;
  benefitchck=true
  constructor(private route:Router,
              private shared : SharedService) { }

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

  benefit(event: any) {
    this.benefitchck = !this.benefitchck
    this.shared.benefitcheckchange(event.target.checked)
  }

  optnchk(check:any) {
    this.shared.optncheckchange(check)
  }
}
