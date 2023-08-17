import {Component, OnInit} from '@angular/core';
import {ErrorDisplayService} from '../../../services/error-service.service';
import {MatDialog} from '@angular/material/dialog';
import {CommonService} from '../../../services/common.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {SpinnerService} from '../../../services/spinner.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-requester-dashboard',
  templateUrl: './requester-dashboard.component.html',
  styleUrls: ['./requester-dashboard.component.css']
})
export class RequesterDashboardComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  isLoading = false;
  rqstSubmitted = 0;
  rqstRejected = 0;
  rqstApproved = 0;
  rqstResubmitted = 0;
  columnDefs = [
    {field: 'index', headerName: 'SL.No', width: 70},
    {field: 'plantCd', headerName: 'Plant Code', filter: true, width: 100},
    {field: 'plantName', headerName: 'Plant Name', filter: true, width: 180 ,flex:'1'},
    {field: 'totlRqstd', headerName: 'Total Amount Requested', filter: true, width: 180},
    {field: 'totlAprvd', headerName: 'Total Amount Approved', filter: true, width: 180},
    {field: 'totlRjctd', headerName: 'Total Amount Rejected ', filter: true, width: 180},
    {field: 'totlPndng', headerName: 'Amount pending for approval', filter: true, width: 250},
  ];

  rowData = [];


  constructor(private errorService: ErrorDisplayService,
              private dialog: MatDialog,
              private route: Router,
              private spinnerService: SpinnerService,
              private commonService: CommonService) {
  }

  ngOnInit(): void  {
    this.getAllDataFromDashboard();

  }

  getAllDataFromDashboard(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getDashboardDataRequester()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            this.rqstSubmitted = response.pendingCount;
            this.rqstRejected = response.rejectdCount;
            this.rqstApproved = response.apprvdCount;
            this.rqstResubmitted = response.resubmitCount;
            this.rowData = response.data;
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }
  gotoRequests(): void {
    this.route.navigate(['/request']);
  }
}

