import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ErrorDisplayService} from '../../services/error-service.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {SpinnerService} from '../../services/spinner.service';
import {CommonService} from '../../services/common.service';
import {FileUploadComponent} from '../../general/file-upload/file-upload.component';

@Component({
  selector: 'app-request-upload-screen',
  templateUrl: './request-upload-screen.component.html',
  styleUrls: ['./request-upload-screen.component.css']
})
export class RequestUploadScreenComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  selectedRequests: any = [];

  @ViewChild('downloadWarning', {static: true}) downloadWarning!: TemplateRef<any>;
  @ViewChild('approveWarning', {static: true}) approveWarning!: TemplateRef<any>;
  columnDefs = [
    {
      field: 'index', checkboxSelection: true, headerName: '#', width: 80, headerCheckboxSelection: true,
      valueGetter: (node: any) => String(node.node.rowIndex + 1)
    },
    {field: 'tempId', headerName: 'tempId', filter: true, width: 120, hide: true},
    {field: 'plantId', headerName: 'plantId', filter: true, width: 120, hide: true},
    {field: 'catgryId', headerName: 'catgryId', filter: true, width: 120, hide: true},
    {field: 'purposeId', headerName: 'purposeId', filter: true, width: 120, hide: true},
    {field: 'typeId', headerName: 'typeId', filter: true, width: 120, hide: true},
    {field: 'department', headerName: 'Department', filter: true, width: 150},
    {field: 'plantName', headerName: 'Plant Name', filter: true, width: 250},
    {field: 'catgry', headerName: 'Category', filter: true, width: 120},
    {field: 'invstmntType', headerName: 'Type Of Investment', filter: true, width: 150},
    {field: 'invstmntPurpose', headerName: 'Purpose of investment', filter: true, width: 180},
    {field: 'qty', headerName: 'Qty', filter: true, width: 70, type: 'rightAligned'},
    {field: 'amount', headerName: 'Approx Value', filter: true, width: 120, type: 'rightAligned'},
    {field: 'payBack', headerName: 'Pay Back', filter: true, width: 100},
    {field: 'payBackPeriod', headerName: 'Pay Back Period', filter: true, width: 130},
    {field: 'details', headerName: 'investment Justification', filter: true, width: 180},
    {field: 'remarks', headerName: 'Remarks', filter: true, width: 150},
  ];

  rowData = [];

  constructor(private dialog: MatDialog,
              private route: Router,
              private errorService: ErrorDisplayService,
              private spinnerService: SpinnerService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.getTempBudgetUploads();
  }

  sendpopup(){
    if (this.selectedRequests.length !== 0 ){
      this.dialog.open(this.approveWarning, {width: '600px'});
    }else{
      this.errorService.showError(0, 'Invalid Action', 'Please select a Request');
    }

  }

  sendRequest(): void {
    const spinner = this.spinnerService.start();
    this.commonService.doSendBudgetPlanForApproval(this.selectedRequests)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.message + '!');
          } else {
            this.errorService.showSuccess(response.retMsg);
            this.selectedRequests = [];
            this.route.navigate(['/request']);

          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );

  }

  clearUploadedData(): void {
    const spinner = this.spinnerService.start();
    this.commonService.clearBudgetUpload(this.selectedRequests)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.message + '!');
          } else {
            this.rowData = response.data;
            this.selectedRequests = [];
            this.getTempBudgetUploads();
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  getTempBudgetUploads(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getTempBudgetUploads()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.message + '!');
          } else {
            this.rowData = response.data;
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  uploadRequest(): void {
    const uploadPopup = this.dialog.open(FileUploadComponent, {
      data: {docType: 'BGTRQ'},
      width: '900px'
    });
    uploadPopup.afterClosed().subscribe(result => {
      this.getTempBudgetUploads();
    });
  }

  download(): void {
    this.dialog.open(this.downloadWarning, {width: '600px'});
  }

  downloadTemplate(): void {
    this.commonService.getBudgetTemplate().subscribe((resp => {
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
  activitySelected(event: any): void {
    console.log(event.node.selected);
    if (event.node.selected === true) {
      this.selectedRequests.push(event.data.tempId);
    } else if (event.node.selected === false) {
      const updateSelect = [];
      for (const el  of this.selectedRequests) {
        if (el !== event.data.tempId ) {
          updateSelect.push(el);
        }
      }
      this.selectedRequests = updateSelect;

      // this.selectedRequests.pop(event.data.tempId);
    }
    console.log(this.selectedRequests);
  }

}
