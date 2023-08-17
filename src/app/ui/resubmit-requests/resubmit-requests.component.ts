import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {ErrorDisplayService} from '../../services/error-service.service';
import {MatDialog} from '@angular/material/dialog';
import {SpinnerService} from '../../services/spinner.service';
import {CommonService} from '../../services/common.service';
import {takeUntil} from 'rxjs/operators';
import {AppConstants} from '../../helpers/AppConstants';
import {Router} from '@angular/router';
import {EditRequestComponent} from '../submit-request/edit-request/edit-request.component';

@Component({
  selector: 'app-resubmit-requests',
  templateUrl: './resubmit-requests.component.html',
  styleUrls: ['./resubmit-requests.component.css']
})
export class ResubmitRequestsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  colDef4 =  function() {
    return '<img src="assets/goto.png" height="32" width="34" style=" margin-top: 5px; margin-left: 25px"/>';
  };
  colDef5 = function () {
    return '<img src="assets/edit.png" height="24" width="22" style=" margin-top: 5px; margin-left: 5px"/>';
  };
  columnDefs = [
    // {
    //   field: '#', checkboxSelection: true, headerName: '#', width: 50
    // },
    {field: 'index', headerName: '#', width: 50},
    {field: 'more', headerName: 'View More', filter: true, width: 100, cellRenderer: this.colDef4},
   // {field: 'edit', headerName: 'Edit', filter: true, width: 70, cellRenderer: this.colDef5},
    {field: 'requstId', headerName: 'requstId', filter: true, width: 120, hide: true},
    {field: 'plantId', headerName: 'plantId', filter: true, width: 120, hide: true},
    {field: 'catgryId', headerName: 'catgryId', filter: true, width: 120, hide: true},
    {field: 'purposeId', headerName: 'purposeId', filter: true, width: 120, hide: true},
    {field: 'typeId', headerName: 'typeId', filter: true, width: 120, hide: true},
    {field: 'budgetId', headerName: 'budget Id', filter: true, width: 200},
    {field: 'department', headerName: 'Department', filter: true, width: 110},
    {field: 'plantName', headerName: 'Plant Name', filter: true, width: 230},
    {field: 'catgry', headerName: 'Category', filter: true, width: 100},
    {field: 'invstmntType', headerName: 'Type Of Investment', filter: true, width: 150},
    {field: 'invstmntPurpose', headerName: 'Purpose of Investment', filter: true, width: 180},
    {field: 'qty', headerName: 'Qty', filter: true, width: 70, type: 'rightAligned'},
    {field: 'amount', headerName: 'Approx Value', filter: true, width: 120, type: 'rightAligned'},
    {field: 'payBack', headerName: 'Pay Back', filter: true, width: 100},
    {field: 'payBackPeriod', headerName: 'Pay Back Period', filter: true, width: 130},
    {field: 'remarks', headerName: 'Investment Justification', filter: true, width: 180},
    {field: 'rejectReason', headerName: 'Rejection Reason', filter: true, width: 180},


  ];

  rowData = [];

  constructor( private dialog: MatDialog,
               private route: Router,
               private errorService: ErrorDisplayService,
               private spinnerService: SpinnerService,
               private commonService: CommonService) { }

  ngOnInit(): void {
    this.getAllResubmittedRequests();
  }

  getAllResubmittedRequests(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getAllResubmittedRequests()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
          } else {
            this.rowData = response.data;
            console.log('resubmitted',this.rowData)
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }
  onGridCellClicked(event: any): void {
    const requestId = event.data.requstId;
    if (event.colDef.field === 'more') {
      // sessionStorage.setItem(AppConstants.resubmit, 'true');
      sessionStorage.setItem(AppConstants.requestId, requestId);
      this.route.navigate(['/request-details']);
    }
    if (event.colDef.field === 'edit') {
      const uploadPopup = this.dialog.open(EditRequestComponent, {
        data: {data: event.data},
        width: '1200px'
      });
      uploadPopup.afterClosed().subscribe((result => {
        this.getAllResubmittedRequests();
      }));
    }
  }

  dashboard() {

  }
}
