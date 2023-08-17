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
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
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
    {field: 'plantName', headerName: 'Plant Name', filter: true, width: 180},
    {field: 'totlRqstd', headerName: 'Total Amount Requested', filter: true, width: 180},
    {field: 'totlAprvd', headerName: 'Total Amount Approved', filter: true, width: 180},
    {field: 'totlRjctd', headerName: 'Total Amount Rejected ', filter: true, width: 180},
    {field: 'totlPndng', headerName: 'Amount pending for approval', filter: true, width: 250},
  ];
  // columnDefs = [
  //   {field: 'index', headerName: 'SL.No', width: 80},
  //   {field: 'rqstId', headerName: 'requstId', filter: true, width: 130, hide: true},
  //   {field: 'budgetId', headerName: 'Budget Id', filter: true, width: 170},
  //   {field: 'deptmnt', headerName: 'Department', filter: true, width: 150},
  //   {field: 'rqstdBy', headerName: 'Proposed By', filter: true, width: 170},
  //   {field: 'rqstType', headerName: 'Investment Type', filter: true, width: 210},
  //   {field: 'plant', headerName: 'Plant Code', filter: true, width: 150},
  //   {field: 'value', headerName: 'Approx Value', filter: true, width: 200},
  //   {field: 'more', headerName: 'View More', filter: true, width: 100, cellRenderer: this.colDef4}  ];

  rowData = [];

  constructor(private errorService: ErrorDisplayService,
              private dialog: MatDialog,
              private route: Router,
              private spinnerService: SpinnerService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.getDashboardDataAdmin();
  }
  getDashboardDataAdmin(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getDashboardDataAdmin()
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
