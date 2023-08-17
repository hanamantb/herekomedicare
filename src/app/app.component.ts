import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';
import {fadeAnimation} from './animations/animation';
import {CryptoService} from './helpers/crypto.service';
import {CookedRawString} from '@angular/compiler/src/output/output_ast';
import {CookieService} from 'ngx-cookie-service';
import {AppConstants} from './helpers/AppConstants';
import {UrlConstants} from './helpers/UrlConstants';
import {MastersService} from "./services/masters.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav', {static: true}) sidenav!: MatSidenav;

  isShown = true ;
  // sidebarEdgeCurve = '15px';
  sidebarItems = [
    {path: '', pathName: 'Dashboard', icon: 'dashboard', },
    {path: '/request', pathName: 'Submitted Request', icon: 'list'},
    {path: '/submitted-request', pathName: 'Request Pending', icon: 'done'},
    {path: '/rejected-request', pathName: 'Request Rejected', icon: 'thumb_down_off_alt', },
    {path: '/approved-request', pathName: 'Request Approved', icon: 'assignment_turned_in', },
    {path: '/resubmit-request', pathName: 'Request Re-Submitted', icon: 'recycling'},
    // {path: '/capex-approval', pathName: 'Capex Approval', icon: 'double_arrow'}
  ];
  sidebarItemsForSPADM = [
    {path: '', pathName: 'Dashboard', icon: 'dashboard', },
    {path: '/request', pathName: 'Submit Request', icon: 'list'},
    {path: '/superadmin-push', pathName: 'HO Push Page', icon: 'list'},
    {path: '/cfo-push', pathName: 'CFO Push Page', icon: 'list'},
    {path: '/submitted-request', pathName: 'Request Submitted', icon: 'done'},
    {path: '/rejected-request', pathName: 'Request Rejected', icon: 'thumb_down_off_alt', },
    {path: '/approved-request', pathName: 'Request Approved', icon: 'assignment_turned_in', },
    {path: '/resubmit-request', pathName: 'Request Re-Submitted', icon: 'recycling'},
    // {path: '/capex-approval', pathName: 'Capex Approval', icon: 'double_arrow'}
  ];
  sideBarItemsForHead = [
    {path: '', pathName: 'Dashboard', icon: 'dashboard'},
    {path: '/all-budgets', pathName: ' All Budgets', icon: 'airport_shuttle'},
    // {path: '/capex-approval', pathName: 'Capex Approval', icon: 'double_arrow'}
  ];
  sidebarLinks = [{path: '/', pathName: '', icon: ''}];
  username = this.cryptoService.decryptData(this.cookie.get(AppConstants.USERNAME));
  department = this.cryptoService.decryptData(this.cookie.get(AppConstants.DEPARTMENT));
  role = this.cryptoService.decryptData(this.cookie.get(AppConstants.role));

  constructor(private route: Router,
              private cryptoService: CryptoService,
              private cookie: CookieService,
              private masterService: MastersService) {
    sessionStorage.setItem(AppConstants.screenId, AppConstants.dashboard);

  }

  panelOpenState = false;

  ngOnInit(): void {
// this.route.navigate(['capex-approval'])
    if (this.role === 'CPXREQ' ) {
      this.sidebarLinks = this.sidebarItems;
    } else if (this.role === 'CPXSPADM') {
      this.sidebarLinks = this.sidebarItemsForSPADM;
    }else {
      this.sidebarLinks = this.sideBarItemsForHead;
    }
  }

  styleObject(index: number): any {
    if (this.role === 'CPXREQ') {
      if (index === 0) {
        // return {'border-radius': this.sidebarEdgeCurve + ' ' + this.sidebarEdgeCurve + ' 0 0'};
      } else if (index === this.sidebarItems.length - 1) {
        // return {'border-radius': '0 0 ' + this.sidebarEdgeCurve + ' ' + this.sidebarEdgeCurve};
      }
    } else {
      if (index === 0) {
        //return {'border-radius': this.sidebarEdgeCurve + ' ' + this.sidebarEdgeCurve + ' 0 0'};
      } else if (index === this.sideBarItemsForHead.length - 1) {
        //return {'border-radius': '0 0 ' + this.sidebarEdgeCurve + ' ' + this.sidebarEdgeCurve};
      }
    }
  }

  clickRoute(path: string): void {
    this.masterService.newEvent('')
    this.route.navigate(['/' + path]);
    this.isShown = false;
    sessionStorage.setItem('phase', '0')
    this.sidenav.toggle();
  }
  clickRoutephaseone(path: string): void {
    this.masterService.newEvent('')
    this.route.navigate(['/' + path]);
    this.isShown = true;
    sessionStorage.setItem('phase', '0')
    this.sidenav.toggle();
  }

  logout(): void {
    sessionStorage.clear();
    this.cookie.deleteAll('/');
    const url = UrlConstants.loginAppUrl;
    window.location.href = UrlConstants.loginAppUrl;
  }

  test(): void {

  }

  redirctToRequest(): void {
    this.route.navigate(['/request-upload']);
  }

  repoNav(fyi:string) {
    this.masterService.newEvent(fyi)
    this.route.navigate(['/repository']);
    this.sidenav.toggle();
  }

  dashboard() {
    this.masterService.summary()
  }
}
