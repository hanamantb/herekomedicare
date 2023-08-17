import {Component, OnInit} from '@angular/core';
import {AppConstants} from '../../helpers/AppConstants';
import {CookieService} from 'ngx-cookie-service';
import {CryptoService} from '../../helpers/crypto.service';
import {takeUntil} from "rxjs/operators";
import {ErrorDisplayService} from '../../services/error-service.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {SpinnerService} from "../../services/spinner.service";
import {CommonService} from "../../services/common.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  role = '';
  budgetResponse: any;
  capexResponse: any;
  private ngUnsubscribe = new Subject();

  constructor(private cookie: CookieService,
              private cryptoService: CryptoService,
              private errorService: ErrorDisplayService,
              private dialog: MatDialog,
              private route: Router,
              private spinnerService: SpinnerService,
              private commonService: CommonService) {
    sessionStorage.setItem(AppConstants.screenId, AppConstants.dashboard);
  }

  ngOnInit(): void {
    this.role = this.cryptoService.decryptData(this.cookie.get(AppConstants.role));
    this.rollCallBudget();
    this.getDashboardCpxReqstr();
    console.log('rooole', this.role);
  }

  rollCallBudget() {
    if (this.role === 'CPXREQ') {
      this.getAllDataFromDashboard();
    } else if (this.role === 'CPXFH' || this.role === 'CPXHOAP'  || this.role === 'CPXAP') {
      this.getAllDataFromOthers();
    } else if (this.role === 'CPXADM') {
      this.getAllDataFromAdmin();
    } else {
      this.getAllDataFromSuperAdmin();
    }
  }

  getAllDataFromDashboard(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getDashboardDataRequester().subscribe((response) => {
      this.budgetResponse = response;
      spinner.close();
    });
  }

  getAllDataFromOthers(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getDashboardDataOthers().subscribe((response) => {
      this.budgetResponse = response;
      spinner.close();
    });
  }

  getAllDataFromAdmin(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getDashboardDataAdmin().subscribe((response) => {
      this.budgetResponse = response;
      spinner.close();
    });
  }

  getAllDataFromSuperAdmin(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getDashboardDataSuperadmin().subscribe((response) => {
      this.budgetResponse = response;
      spinner.close();
    });
  }

  getDashboardCpxReqstr(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getDashboardCpxReqstr()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            this.capexResponse = response;
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }
//   getDashboardCpxReqstr(): void {
//     const spinner = this.spinnerService.start();
//     this.commonService.reportIO().subscribe((response) => {
//       const url = window.URL.createObjectURL(response);
//       const a = document.createElement('a');
//       document.body.appendChild(a);
//       a.setAttribute('style', 'display: none');
//       a.href = url;
//       a.download = 'report.xlsx';
//       a.click();
//       window.URL.revokeObjectURL(url);
//       a.remove(); // remove the element
//       // this.toastr.success('Successfully Downloaded', '');
//     })
// }


  summary() {
    let route = '';
    if (this.role === 'CPXREQ') {
      route = 'req-dash';
    } else if (this.role === 'CPXFH') {
      route = 'vp-dash';
    } else if (this.role === 'CPXHOAP') {
      route = 'cfo-dash';
    } else if (this.role === 'CPXADM') {
      route = 'admin-dash';
    } else {
      route = 'super-dash';
    }
    this.route.navigate([route])
  }
}
