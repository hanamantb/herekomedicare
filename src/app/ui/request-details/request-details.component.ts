import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AppConstants} from '../../helpers/AppConstants';
import {CookieService} from 'ngx-cookie-service';
import {CryptoService} from '../../helpers/crypto.service';
import {FileUploadComponent} from '../../general/file-upload/file-upload.component';
import {MatDialog} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {ErrorDisplayService} from '../../services/error-service.service';
import {SpinnerService} from '../../services/spinner.service';
import {CommonService} from '../../services/common.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AgGridAngular} from 'ag-grid-angular';
import {UpdateQuantitiesComponent} from './update-quantities/update-quantities.component';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {
  @ViewChild('approveWarning', {static: true}) approveWarning!: TemplateRef<any>;
  @ViewChild('rejectWarning', {static: true}) rejectWarning!: TemplateRef<any>;
  @ViewChild('resubmitWarning', {static: true}) resubmitWarning!: TemplateRef<any>;
  private ngUnsubscribe = new Subject();
  role = '';
  username = '';
  approvalId: any;
  requestId: any;
  resubmit: any;
  rejectReson = '';
  apprvRemarks = '';
  resubmitRemrks = '';
  resubmitBtnEnable = false;
  showEditButton = true;
  buttonHide = false;
  pending:any;
  workstage:any;
  colDef4 = function () {
    return '<img src="assets/download.png" height="32" width="34" style=" margin-top: 5px; margin-left: 15px"/>';
  };
  colDef5 = function () {
    return '<img src="assets/delete.png" height="32" width="34" style=" margin-top: 5px; margin-left: 15px"/>';
  };
  columnDefs = [
    {field: 'index', headerName: 'SL.No', width: 100},
    {field: 'docName', headerName: 'Document Name', filter: true, width: 550},
    {field: 'download', headerName: 'Download', filter: true, width: 125, cellRenderer: this.colDef4},
    {field: 'delete', headerName: 'Delete', filter: true, width: 125, cellRenderer: this.colDef5}
  ];

  rowData = [];

  headerData: HeaderData = {
    department: ' ',
    plantName: ' ',
    plantCd: ' ',
    catgry: '',
    invstmntType: '',
    invstmntPurpose: '',
    qty: 0,
    aproxVal: 0,
    amount: 0,
    payback: ' ',
    payBackPeriod: ' ',
    remarks: ' ',
    details: '',
    budgetNmbr: '',
    pendingwith: '',
    workstage:0,
  };


  constructor(private cookie: CookieService,
              private dialog: MatDialog,
              private route: Router,
              private errorService: ErrorDisplayService,
              private spinnerService: SpinnerService,
              private commonService: CommonService,
              private cryptoService: CryptoService) {
    this.role = this.cryptoService.decryptData(this.cookie.get(AppConstants.role));
    this.requestId = sessionStorage.getItem(AppConstants.requestId);
    this.resubmit = sessionStorage.getItem(AppConstants.resubmit);
    console.log('resubmit', this.resubmit)
    if (this.resubmit === 'true') {
      this.resubmitBtnEnable = true;
      sessionStorage.setItem(AppConstants.resubmit, 'false');
    }

  }

  ngOnInit(): void {
    this.getCommonDetailsOfRequest();
    this.getAllCommonDocuments();
    this.username = this.cryptoService.decryptData(this.cookie.get(AppConstants.USERNAME));
  }

  approveRequest(): void {
    console.log('workstage',this.headerData.workstage)
    if (this.headerData.workstage < 4) {
      this.approveBydeptHead(parseInt(this.requestId), this.apprvRemarks);
     console.log('worked approveBydeptHead')
    } else  {
      console.log('worked approvalByHo')
      this.approvalByHo(parseInt(this.requestId), this.apprvRemarks);
    }
  }

  rejectRequest(): void {
    this.rejection(parseInt(this.requestId), this.rejectReson);
  }

  onGridCellClicked(event: any): void {
    if (event.colDef.field === 'download') {
      const docId = event.data.docId;
      const docName = event.data.docName;
      this.downloadDocument(docId, docName);
    } else if (event.colDef.field === 'delete') {
      const docId = event.data.docId;
      this.deleteDocument(docId);
    }
  }


  upload(): void {
    const uploadPopup = this.dialog.open(FileUploadComponent, {
      data: {docType: 'CMN'},
      width: '900px'
    });
    uploadPopup.afterClosed().subscribe(result => {
      this.getAllCommonDocuments();
    });
  }

  getCommonDetailsOfRequest(): void {
    const requestId = parseInt(this.requestId);
    const spinner = this.spinnerService.start();
    this.commonService.getCommonDetailsOfRequest(requestId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            this.headerData = response.data;
            this.pending =this.headerData.pendingwith
            console.log('pendingwith',this.headerData);
            this.buttonHide = response.buttonHide;
            this.showEditButton = response.showEditButton;
            this.workstage = response.workstage;
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  getAllCommonDocuments(): void {
    const requestId = parseInt(this.requestId)
    const spinner = this.spinnerService.start();
    this.commonService.getAllCommonDocuments(requestId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            console.log(response.data);
            this.rowData = response.data;
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }


  deleteDocument(docId: number): void {
    const spinner = this.spinnerService.start();
    this.commonService.deleteDocument(docId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {

            this.errorService.showSuccess(response.retMsg);
            this.getAllCommonDocuments();
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  downloadDocument(docId: number, docName: string): void {
    let phase = 1;
    this.commonService.downloadDocument(docId, phase).subscribe((resp => {
      const url = window.URL.createObjectURL(resp);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = docName;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
      // this.toastr.success('Successfully Downloaded', '');
    }));
  }

  openApproveWarning(): void {
    this.dialog.open(this.approveWarning, {width: '600px'});
  }

  openRejectWarning(): void {
    this.dialog.open(this.rejectWarning, {width: '600px'});
  }

  openResubmitWarning(): void {
    this.dialog.open(this.resubmitWarning, {width: '600px'});
  }


  resubmitRequest(): void {
    const requestId = parseInt(this.requestId);
    const spinner = this.spinnerService.start();
    this.commonService.resubmitRequest(requestId, this.resubmitRemrks)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            sessionStorage.setItem(AppConstants.resubmit, 'false');
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

  approveBydeptHead(requestId: number, remarks: string): void {
    // configure Approval api for FH
    const spinner = this.spinnerService.start();
    this.commonService.approvalForDeptHead(requestId, remarks)
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

  approvalByHo(requestId: number, remarks: string): void {
    // configure Approval api for FH
    const spinner = this.spinnerService.start();
    this.commonService.approvalByHo(requestId, remarks)
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

  rejection(requestId: number, rejectReson: string): void {
    // configure Approval api for FH
    const spinner = this.spinnerService.start();
    this.commonService.rejection(requestId, rejectReson)
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

  clickEdit(): void {
    console.log('header dataa---', this.headerData)
    const uploadPopup = this.dialog.open(UpdateQuantitiesComponent, {
      data: {
        appoxVal: this.headerData.amount,
        qty: this.headerData.qty,
        requestId: parseInt(this.requestId)
      },
      width: '600px'
    });
    uploadPopup.afterClosed().subscribe(result => {
      this.getCommonDetailsOfRequest();
    });
  }

}

interface HeaderData {
  department: string;
  plantName: string;
  plantCd: string;
  catgry: string;
  invstmntType: string;
  invstmntPurpose: string;
  qty: number;
  aproxVal: number;
  amount: number;
  payback: string;
  payBackPeriod: string;
  remarks: string;
  details: string;
  budgetNmbr: string;
  pendingwith: string;
  workstage: number
}
