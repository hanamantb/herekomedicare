import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {AppConstants} from '../../../helpers/AppConstants';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {SpinnerService} from '../../../services/spinner.service';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDisplayService} from '../../../services/error-service.service';
import {CommonService} from '../../../services/common.service';
import { CryptoService } from 'src/app/helpers/crypto.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-capex-approval-for-functional-head',
  templateUrl: './capex-approval-for-functional-head.component.html',
  styleUrls: ['./capex-approval-for-functional-head.component.css']
})
export class CapexApprovalForFunctionalHeadComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  rqstSubmitted = 0;
  rqstRejected = 0;
  rqstApproved = 0;
  role:any;

  colDef4 = function() {
    return '<img src="assets/goto.png" height="24" width="22" style=" margin-top: 5px; margin-left: 25px;text-align: center"/>';
  };
  colDef5 = function() {
    return '<img src="assets/goto.png" height="24" width="22" style=" margin-top: 5px; margin-left: 25px;text-align: center"/>';
  };


  columnDefs = [
    {field: 'index', headerName: 'SL.No', width: 70},
    {field: 'plantCd', headerName: 'Plant Code', filter: true, width: 100},
    {field: 'plantName', headerName: 'Plant Name', filter: true, width: 250,flex:'1'},
    {field: 'totlRqstd', headerName: 'Capex Amount Pending', filter: true, width: 180},
    {field: 'totlAprvd', headerName: 'Capex Amount Approved', filter: true, width: 250},
    {field: 'totlRjctd', headerName: 'Capex Amount Rejected', filter: true, width: 180},
  ];

  rowData = [];

  constructor(private route: Router,
              private dialog: MatDialog,
              private errorService: ErrorDisplayService,
              private spinnerService: SpinnerService,
              private commonService: CommonService,
              private cryptoService: CryptoService,
              private cookie: CookieService) { }

  ngOnInit(): void {
    this.getAllBudgetApprovals();
    this.getDashboardCpxReqstr();
    this.role = this.cryptoService.decryptData(this.cookie.get(AppConstants.role));
  }
  onGridCellClicked(event: any): void {
    const approvalId = event.data.approvalId;
    console.log('clicks',event.data)
    console.log('appid',event.data.approvalId)
    if (event.colDef.field === 'more') {
      sessionStorage.setItem(AppConstants.approvalId, approvalId);
      this.route.navigate(['/approval-details']);
    }

  }
  getAllBudgetApprovals(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getAllBudgetApprovals()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
          } else {
            this.rowData = response.detail;
            console.log(response.detail)
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
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
            console.log('pend',response.pendingCount)
            this.rqstSubmitted = response.pendingCount;
            this.rqstRejected = response.rejectdCount;
            this.rqstApproved = response.apprvdCount;

          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  gotoBudget(): void {
    this.route.navigate(['/new-budget']);
  }
}
