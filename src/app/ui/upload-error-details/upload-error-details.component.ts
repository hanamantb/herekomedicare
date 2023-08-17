import { Component, OnInit } from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ErrorDisplayService} from '../../services/error-service.service';
import {MatDialog} from '@angular/material/dialog';
import {SpinnerService} from '../../services/spinner.service';
import {CommonService} from '../../services/common.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-upload-error-details',
  templateUrl: './upload-error-details.component.html',
  styleUrls: ['./upload-error-details.component.css']
})
export class UploadErrorDetailsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  columnDefs = [
    {field: 'index', headerName: 'SL.No', width: 70},
    {field: 'errorSuggestn', headerName: 'Row No.', filter: true, width: 300},
    {field: 'errorMsg', headerName: 'Error Message', filter: true, width: 450},
  ];

  rowData = [];

  constructor(private errorService: ErrorDisplayService,
              private dialog: MatDialog,
              private spinnerService: SpinnerService,
              private commonService: CommonService) { }

  ngOnInit(): void {
    this.getAllUploadedErrorMsgs();
  }
  getAllUploadedErrorMsgs(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getAllUploadedErrorMsgs()
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

}
