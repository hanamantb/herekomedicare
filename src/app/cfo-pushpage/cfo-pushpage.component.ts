import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

import {takeUntil} from 'rxjs/operators';

import {Subject} from 'rxjs';

import {CookieService} from 'ngx-cookie-service';
import {AgGridAngular} from 'ag-grid-angular';
import {EditRequestComponent} from '../ui/submit-request/edit-request/edit-request.component';
import {SpinnerService} from '../services/spinner.service';
import {ErrorDisplayService} from '../services/error-service.service';
import {CommonService} from '../services/common.service';
import {AppConstants} from '../helpers/AppConstants';
import {CryptoService} from '../helpers/crypto.service';
@Component({
  selector: 'app-cfo-pushpage',
  templateUrl: './cfo-pushpage.component.html',
  styleUrls: ['./cfo-pushpage.component.css']
})
export class CfoPushpageComponent implements OnInit {
  @ViewChild('approveWarning', {static: true}) approveWarning!: TemplateRef<any>;
  @ViewChild('rejectWarning', {static: true}) rejectWarning!: TemplateRef<any>;
  @ViewChild('agGrid', {static: true}) ahGrid!: AgGridAngular;
  private ngUnsubscribe = new Subject();
  role = '';
  selectedRequests: any = [];
  flag = true;
  apprvRemarks = '';
  userId = 0;
  rejectReson = '';
  stsflag = true;
  @ViewChild('downloadWarning', {static: true}) downloadWarning!: TemplateRef<any>;
  colDef4 = function () {
    return '<img src="assets/goto.png" height="24" width="22" style=" margin-top: 5px; margin-left: 25px;text-align: center"/>';
  };
  // colDef5 = function () {
  //   return '<img src="assets/edit.png" height="24" width="22" style=" margin-top: 5px; margin-left: 5px"/>';
  // };
  columnDefs = [

    {
      field: 'index', checkboxSelection: true, headerName: '#', width: 80, headerCheckboxSelection: true,headerCheckboxSelectionFilteredOnly: true,
      valueGetter: (node: any) => String(node.node.rowIndex + 1)

    },
    {field: 'more', headerName: 'View More', filter: false, width: 90, cellRenderer: this.colDef4},
    {field: 'requstId', headerName: 'requstId', filter: true, width: 120, hide: true},
    {field: 'plantId', headerName: 'plantId', filter: true, width: 120, hide: true},
    {field: 'catgryId', headerName: 'catgryId', filter: true, width: 120, hide: true},
    {field: 'purposeId', headerName: 'purposeId', filter: true, width: 120, hide: true},
    {field: 'typeId', headerName: 'typeId', filter: true, width: 120, hide: true},
    {field: 'budgetId', headerName: 'Budget Id', filter: true, width: 200},
    {field: 'requester', headerName: 'Requester', filter: true, width: 200},
    {field: 'department', headerName: 'Department', filter: true, width: 120},
    {field: 'plantName', headerName: 'Plant Name', filter: true, width: 230},
    {field: 'catgry', headerName: 'Category', filter: false, width: 100},
    {field: 'invstmntType', headerName: 'Type Of Investment', filter: true, width: 150},
    {field: 'invstmntPurpose', headerName: 'Purpose of Investment', filter: false, width: 180},
    {field: 'qty', headerName: 'Qty', filter: false, width: 70, type: 'rightAligned'},
    {field: 'amount', headerName: 'Approx Value', filter: false, width: 120, type: 'rightAligned'},
    {field: 'payBack', headerName: 'Pay Back', filter: false, width: 80},
    {field: 'payBackPeriod', headerName: 'Pay Back Period', filter: false, width: 130},
    {field: 'details', headerName: 'Investment Justification', filter: false, width: 180},
    {field: 'remarks', headerName: 'Remarks', filter: false, width: 180},
    {field: 'pending', headerName: 'Pending', filter: false, width: 120},
    {field: 'status', headerName: 'Status', filter: false, width: 100},


  ];

  rowData = [];

  constructor(private dialog: MatDialog,
              private cookie: CookieService,
              private route: Router,
              private errorService: ErrorDisplayService,
              private spinnerService: SpinnerService,
              private commonService: CommonService,
              private cryptoService: CryptoService, ) {
    this.role = this.cryptoService.decryptData(this.cookie.get(AppConstants.role));

  }

  ngOnInit(): void {
    this.getRequestedDetails();
  }


  getRequestedDetails(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getCfoPushRequestedDetails()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {

          this.rowData = response.data;
          this.userId = response.userId;
          console.log(this.rowData);

          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }


  onGridCellClicked(event: any, data: any): void {
    console.log(event.data.edit);
    console.log(typeof (event.colDef.field));
    this.stsflag = event.data.edit;

    const requestId = event.data.requstId;
    if (event.colDef.field === 'more') {
      sessionStorage.setItem(AppConstants.requestId, requestId);
      this.route.navigate(['/request-details']);

    } else if (event.colDef.field === 'edit' && this.stsflag) {
      this.stsflag = false
      const uploadPopup = this.dialog.open(EditRequestComponent, {
        data: {data: event.data},
        width: '1200px'
      });
      uploadPopup.afterClosed().subscribe((result => {
        this.getRequestedDetails();
      }));

    } else if (!this.stsflag && this.role === 'CPXREQ' && event.colDef.headerName === 'Edit') {
      this.errorService.showError(0, 'Invalid Action!', ' Request is already Approved to next level');

    } else {
      console.log('nothing');
    }
  }
  activitySelected(event: any): void {
    console.log(event.node.selected);
    if (event.node.selected === true) {
      this.selectedRequests.push(event.data.requstId);
    } else if (event.node.selected === false) {
      const updateSelect = [];
      for (const el of this.selectedRequests) {
        if (el !== event.data.requstId) {
          updateSelect.push(el);
        }
      }
      this.selectedRequests = updateSelect;

      // this.selectedRequests.pop(event.data.tempId);
    }
    console.log(this.selectedRequests);
  }

  spadmpush() {
    console.log('spadmpush', this.selectedRequests)
    if (this.selectedRequests.length === 0) {
      this.errorService.showError(0, 'Failed', 'No requests Selected' + '!');
    } else {
      const spinner = this.spinnerService.start();
      this.commonService.pushToCfo(this.selectedRequests)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (response) => {
            if (response.retVal !== 0) {
              this.errorService.showError(0, 'Failed', response.retMsg + '!');
            } else {
              this.route.navigate(['/']);
              this.errorService.showSuccess('Pushed successfully');
            }
            this.spinnerService.stop(spinner);
          },
          (_: any) => {
            this.spinnerService.stop(spinner);
          },
        );
    }
  }


}
