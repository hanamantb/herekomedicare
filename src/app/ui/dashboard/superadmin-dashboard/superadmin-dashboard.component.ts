import { Component, OnInit } from '@angular/core';
import {ErrorDisplayService} from '../../../services/error-service.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {SpinnerService} from '../../../services/spinner.service';
import {Subject} from 'rxjs';
import {CommonService} from '../../../services/common.service';
import {AppConstants} from '../../../helpers/AppConstants';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.css']
})
export class SuperadminDashboardComponent implements OnInit {

  private ngUnsubscribe = new Subject();
  rqstSubmitted = 0;
  rqstRejected = 0;
  rqstApproved = 0;
  colDef4 = function() {
    return '<img src="assets/goto.png" height="24" width="22" style=" margin-top: 5px; margin-left: 25px;text-align: center"/>';
  };
  columnDefs = [
    {field: 'index', headerName: 'SL.No', width: 70},
    {field: 'plantCd', headerName: 'Plant Code', filter: true, width: 100},
    {field: 'plantName', headerName: 'Plant Name', filter: true, width: 250},
    {field: 'totlRqstd', headerName: 'Total Amount Requested', filter: true, width: 200},
    {field: 'totlAprvd', headerName: 'Total Amount Approved', filter: true, width: 200},
    {field: 'totlRjctd', headerName: 'Total Amount Rejected ', filter: true, width: 200},
    {field: 'totlPndng', headerName: 'Amount pending for approval', filter: true, width: 250},
  ];
  rowData = [];

  constructor(private errorService: ErrorDisplayService,
              private dialog: MatDialog,
              private route: Router,
              private spinnerService: SpinnerService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.getDashboardDataSuperadmin();
  }

  getDashboardDataSuperadmin(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getDashboardDataSuperadmin()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            this.rqstSubmitted = response.pendingCount;
            this.rqstRejected = response.rejectdCount;
            this.rqstApproved = response.apprvdCount;
            this.rowData = response.data;
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  onGridCellClicked(event: any): void {
    const requestId = event.data.rqstId;
    if (event.colDef.field === 'more') {
      sessionStorage.setItem(AppConstants.requestId, requestId);
      this.route.navigate(['/request-details']);
    }
  }
  gotoRequests(): void {
    this.route.navigate(['/request']);
  }
}
