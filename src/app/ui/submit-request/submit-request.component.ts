import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FileUploadComponent} from '../../general/file-upload/file-upload.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {EditRequestComponent} from './edit-request/edit-request.component';
import {CommonService} from '../../services/common.service';
import {takeUntil} from 'rxjs/operators';
import {ErrorDisplayService} from '../../services/error-service.service';
import {Subject} from 'rxjs';
import {SpinnerService} from '../../services/spinner.service';
import {AppConstants} from '../../helpers/AppConstants';
import {CookieService} from 'ngx-cookie-service';
import {CryptoService} from '../../helpers/crypto.service';
import {AgGridAngular} from 'ag-grid-angular';
import {GridApi, RowNode} from 'ag-grid-community';
import {MastersService} from "../../services/masters.service";

@Component({
  selector: 'app-submit-request',
  templateUrl: './submit-request.component.html',
  styleUrls: ['./submit-request.component.css']
})
export class SubmitRequestComponent implements OnInit {
  @ViewChild('approveWarning', {static: true}) approveWarning!: TemplateRef<any>;
  @ViewChild('rejectWarning', {static: true}) rejectWarning!: TemplateRef<any>;
  @ViewChild('filter', {static: true}) filter!: TemplateRef<any>;
  @ViewChild('agGrid', {static: true}) ahGrid!: AgGridAngular;
  private ngUnsubscribe = new Subject();
  role = '';
  selectedRequests: any = [];
  deptrequests: any[] = [];
  horequests: any[] = [];
  flag = true;
  apprvRemarks = '';
  userId = 0;
  rejectReson = '';
  stsflag = true;
  gridapi?: GridApi;

  @ViewChild('downloadWarning', {static: true}) downloadWarning!: TemplateRef<any>;
  colDef4 = function () {
    return '<img src="assets/goto.png" height="24" width="22" style=" margin-top: 5px; margin-left: 25px;text-align: center"/>';
  };
  colDef5 = function () {
    return '<img src="assets/edit.png" height="24" width="22" style=" margin-top: 5px; margin-left: 5px"/>';
  };
  columnDefs = [
    // {
    //   field: '#', checkboxSelection: true, headerName: '#', width: 50
    // },
    {
      field: 'index', checkboxSelection: true, headerName: '#', width: 80, headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      valueGetter: (node: any) => String(node.node.rowIndex + 1)
    },
    {field: 'more', headerName: 'View More', filter: false, width: 90, cellRenderer: this.colDef4},
    {field: 'edit', headerName: 'Edit', filter: false, width: 60, cellRenderer: this.colDef5, lockVisible: Boolean('edit')},
    {field: 'requstId', headerName: 'requstId', filter: true, width: 120, hide: true},
    {field: 'requester', headerName: 'Requester', filter: true, width: 120},
    {field: 'plantId', headerName: 'plantId', filter: true, width: 120, hide: true},
    {field: 'catgryId', headerName: 'catgryId', filter: true, width: 120, hide: true},
    {field: 'purposeId', headerName: 'purposeId', filter: true, width: 120, hide: true},
    {field: 'typeId', headerName: 'typeId', filter: true, width: 120, hide: true},
    {field: 'budgetId', headerName: 'Budget Id', filter: true, width: 200},
    {field: 'department', headerName: 'Department', filter: true, width: 120},
    {field: 'plantName', headerName: 'Plant Name', filter: true, width: 230},
    {field: 'catgry', headerName: 'Category', filter: false, width: 100},
    {field: 'invstmntType', headerName: 'Type Of Investment', filter: true, width: 150},
    {field: 'invstmntPurpose', headerName: 'Purpose of Investment', filter: false, width: 180},
    {field: 'qty', headerName: 'Qty', filter: true, width: 70, type: 'rightAligned'},
    {field: 'amount', headerName: 'Approx Value', filter: true, width: 120, type: 'rightAligned'},
    {field: 'payBack', headerName: 'Pay Back', filter: false, width: 80},
    {field: 'payBackPeriod', headerName: 'Pay Back Period', filter: false, width: 130},
    {field: 'details', headerName: 'Investment Justification', filter: false, width: 180},
    {field: 'remarks', headerName: 'Remarks', filter: false, width: 180},
    {field: 'pending', headerName: 'Pending', filter: true, width: 120},
    {field: 'status', headerName: 'Status', filter: true, width: 100},


  ];

  rowData = [];

  constructor(private dialog: MatDialog,
              private cookie: CookieService,
              private route: Router,
              private errorService: ErrorDisplayService,
              private spinnerService: SpinnerService,
              private commonService: CommonService,
              private cryptoService: CryptoService,
              private masterService: MastersService) {
    this.role = this.cryptoService.decryptData(this.cookie.get(AppConstants.role));

  }

  ngOnInit(): void {
    this.getRequestedDetails();
  }

  getRequestedDetails(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getRequestedDetails(this.role)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            this.rowData = response.data;
            this.userId = response.userId;
            console.log(this.rowData);
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }


  onGridCellClicked(event: any, data: any): void {
    //this.stsflag = false
    // console.log(event.data.edit);
    // console.log(typeof (event.colDef.field));
    this.stsflag = event.data.edit;
    const requestId = event.data.requstId;
    if (event.colDef.field === 'more') {
      sessionStorage.setItem(AppConstants.requestId, requestId);
      this.route.navigate(['/request-details']);

    } else if (event.colDef.field === 'edit' && this.stsflag) {
      this.stsflag = false;
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
      // console.log('nothing');
    }
  }

  test(event: any): void {
    this.gridapi = event.api;
    if (this.role !== 'CPXREQ') {
      this.flag = false;
    }
    console.log(this.flag);
    if (event.columnApi !== undefined || event.columnApi !== null) {
      event.columnApi.setColumnVisible('edit', this.flag);
    }
  }

  activitySelected(event: any): void {
    console.log(event);
    this.gridapi?.forEachNodeAfterFilter((rowNode: RowNode, index: number) => {

    });
    if (event.node.selected === true) {
      if (event.data.workstage < 4) {
        if (!this.deptrequests.includes(event.data.requstId)){
          console.log('not include dpt')
          this.deptrequests.push(event.data.requstId);
        }

      } else {
        if (!this.horequests.includes(event.data.requstId)){
          console.log('not include ho')
          this.horequests.push(event.data.requstId);
        }

      }
      this.selectedRequests.push(event.data.requstId);
    } else if (event.node.selected === false) {
      const updateSelect = [];
      for (const el of this.selectedRequests) {
        if (el !== event.data.requstId) {
          updateSelect.push(el);
        }
      }
      this.selectedRequests = updateSelect;

      this.deptrequests.forEach((elment, idx: number, _) => {
        if (elment === event.data.requstId) {
          this.deptrequests.splice(idx, 1);
        }
      });

      this.horequests.forEach((elment, idx: number, _) => {
        if (elment === event.data.requstId) {
          this.horequests.splice(idx, 1);
        }
      });

      // this.selectedRequests.pop(event.data.tempId);
    }
    console.log(this.selectedRequests);
  }

  multileApproveBydeptHead(): void {
    const spinner = this.spinnerService.start();
    this.commonService.mutlipleApprovalForDeptHead(this.deptrequests, this.apprvRemarks)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            this.route.navigate(['/']);
            this.errorService.showSuccess(response.retMsg);
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );

  }

  multipleApprovalByHo(): void {
    const spinner = this.spinnerService.start();
    this.commonService.mutilpleApproveByHo(this.horequests, this.apprvRemarks)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            this.route.navigate(['/']);
            this.errorService.showSuccess(response.retMsg);
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );

  }


  approveRequest(): void {

    console.log('deptrequests',this.deptrequests)
    console.log('horequests',this.horequests)
    if (this.role === 'CPXSPADM') {
      this.spadmpush();
    } else {
      if (this.deptrequests.length !== 0) {
        this.multileApproveBydeptHead();
      }
      if (this.horequests.length !== 0) {
        this.multipleApprovalByHo();
      }
    }


    // if (this.role === 'CPXFH') {
    //   this.multileApproveBydeptHead();
    // } else if (this.role === 'CPXAP') {
    //   this.multipleApprovalByHo();
    // } else if (this.role === 'CPXSPADM') {
    //   this.spadmpush();
    // }
  }

  rejectMultiRequest(): void {
    const spinner = this.spinnerService.start();
    this.commonService.multipleRejection(this.selectedRequests, this.rejectReson)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            this.route.navigate(['/']);
            this.errorService.showSuccess(response.retMsg);
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  openRejectWarning(): void {
    if (this.role === 'CPXREQ' || this.role === 'CPXADM' || this.role === 'CPXSPADM') {
      this.errorService.showError(0, 'Restricted', 'This Action Not Possible');
    } else {
      this.dialog.open(this.rejectWarning, {width: '600px'});
    }
  }

  filterReq(): void {
    this.dialog.open(this.filter, {width: '600px'});
  }

  multipleApproval(): void {
    if (this.role === 'CPXREQ' || this.role === 'CPXADM' || this.role === 'CPXSPADM') {
      this.errorService.showError(0, 'Restricted', 'This Action Not Possible');
    } else {
      this.dialog.open(this.approveWarning, {width: '600px'});
    }
  }

  spadmpush() {
    console.log('spadmpush', this.selectedRequests)
    if (this.selectedRequests.length === 0) {
      this.errorService.showError(0, 'Failed', 'No requests Selected' + '!');
    } else {
      const spinner = this.spinnerService.start();
      this.commonService.pushToHo(this.selectedRequests)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (response) => {
            if (response.retVal !== 0) {
              this.errorService.showError(0, 'Failed', response.retMsg + '!');
            } else {
              this.route.navigate(['/']);
              this.errorService.showSuccess(response.retMsg);
            }
            this.spinnerService.stop(spinner);
          },
          (_: any) => {
            this.spinnerService.stop(spinner);
          },
        );
    }
  }

  dwnldfilteredrequest(): void {
    if (this.selectedRequests != null) {
      this.commonService.dwnldfilteredrequest(this.selectedRequests).subscribe((resp => {
        const url = window.URL.createObjectURL(resp);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = 'Budget_Approval_Template.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
        // this.toastr.success('Successfully Downloaded', '');
      }));
    }
  }

  dashboard() {
    this.masterService.summary()
  }
}
