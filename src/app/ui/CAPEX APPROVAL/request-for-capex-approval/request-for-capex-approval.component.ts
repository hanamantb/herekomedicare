import {Component, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SpinnerService} from '../../../services/spinner.service';
import {CommonService} from '../../../services/common.service';
import {ErrorDisplayService} from '../../../services/error-service.service';
import {Subject} from 'rxjs';
import {AppConstants} from '../../../helpers/AppConstants';

@Component({
  selector: 'app-request-for-capex-approval',
  templateUrl: './request-for-capex-approval.component.html',
  styleUrls: ['./request-for-capex-approval.component.css']
})
export class RequestForCapexApprovalComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  rqstSubmitted = 0;
  rqstRejected = 0;
  rqstApproved = 0;

  colDef4 = function () {
    return '<img src="assets/goto.png" height="24" width="22" style=" margin-top: 5px; margin-left: 25px;text-align: center"/>';
  };
  colDef5 = function () {
    return '<img src="assets/goto.png" height="24" width="22" style=" margin-top: 5px; margin-left: 25px;text-align: center"/>';
  };


  columnDefs = [
    {field: 'index', headerName: 'SL.No', width: 70},
    {field: 'plantCd', headerName: 'Plant Code', filter: true, width: 100},
    {field: 'plantName', headerName: 'Plant Name', filter: true, width: 180, flex:'1'},
    {field: 'totlAprvd', headerName: 'Budget Amount Approved', filter: true, width: 180},
    {field: 'cpxapproved', headerName: ' Capex Approved', filter: true, width: 180},
    {field: 'mstrrem', headerName: 'Capex Amount Remaining', filter: true, width: 180},
    {field: 'mstrreq', headerName: 'Capex Amount Requested', filter: true, width: 180},
    // {field: 'utilised', headerName: 'Budget Amount Utilized', filter: true, width: 180},
  ];

  rowData = [];


  constructor(private route: Router,
              private dialog: MatDialog,
              private errorService: ErrorDisplayService,
              private spinnerService: SpinnerService,
              private commonService: CommonService) {

  }

  ngOnInit(){
    this.getAllBudgetApprovals();
    this.getDashboardCpxReqstr()
  }

  gotoBudget(): void {
    this.route.navigate(['/new-budget']);
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
            console.log(response)
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

  onGridCellClicked(event: any): void {
    const approvalId = event.data.approvalId;
    console.log('clicks', event.data)
    console.log('appid', event.data.approvalId)
    if (event.colDef.field === 'more') {
      sessionStorage.setItem(AppConstants.approvalId, approvalId);
      this.route.navigate(['/approval-details']);
    }

  }
}

