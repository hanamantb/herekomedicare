import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {AppConstants} from '../../helpers/AppConstants';
import {CookieService} from 'ngx-cookie-service';
import {CryptoService} from '../../helpers/crypto.service';
import {UrlConstants} from '../../helpers/UrlConstants';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EditRequestComponent} from '../../ui/submit-request/edit-request/edit-request.component';
import {UploadErrorDetailsComponent} from '../../ui/upload-error-details/upload-error-details.component';
import {ErrorDisplayService} from '../../services/error-service.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  docType = '';
  requestId: any;
  approvalId: any;
  @Output() result: EventEmitter<any> = new EventEmitter<any>();
  appId = AppConstants.AppId;
  screenId = sessionStorage.getItem(AppConstants.screenId);
  afuConfig = {
    multiple: false,
    formatsAllowed: '.xlsx,.xls,.txt,.jpg,.msg,doc,.docx',
    hideProgressBar: false,
    hideResetBtn: true,
    replaceTexts: {
      selectFileBtn: 'Select Document to upload',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    },
    uploadAPI: {
      url: '',
      headers: {
        Authorization: `${this.cryptoService.decryptData(this.cookie.get(AppConstants.AUTHKEY))}`,
        AppId: `${this.appId}`,
        screenId: `${this.screenId}`,
      }

    }
  };

  constructor(private cookie: CookieService,
              private dialog: MatDialog,
              private errorService: ErrorDisplayService,
              private cryptoService: CryptoService,
              private dialogRef: MatDialogRef<FileUploadComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.docType = this.data.docType;
    this.requestId = sessionStorage.getItem(AppConstants.requestId);
    this.approvalId = sessionStorage.getItem(AppConstants.approvalId);
    console.log(this.docType);
    if (this.docType !== '') {
      if (this.docType === 'BGTRQ') {
        this.afuConfig.uploadAPI.url = UrlConstants.uploadDocument + '?docType=' + this.data.docType;
      } else if (this.docType === 'CPXRQ') {
        this.afuConfig.uploadAPI.url = UrlConstants.uploadApprovalDocument + '?docType=' + this.data.docType + '&approvalId=' + parseInt(this.approvalId);
      } else if (this.docType === 'PBACK') {
        this.afuConfig.uploadAPI.url = UrlConstants.uploadApprovalDocument + '?docType=' + this.data.docType + '&approvalId=' + null;
      } else if (this.docType === 'CMNAP') {
      this.afuConfig.uploadAPI.url = UrlConstants.uploadApprovalDocument + '?docType=' + this.data.docType + '&approvalId=' + null;
    } else {
        this.afuConfig.uploadAPI.url = UrlConstants.uploadDocument + '?docType=' + this.data.docType + '&requestId=' + parseInt(this.requestId);
      }
    }
  }


  afterUpload(event: any): void {
    console.log(event.body.retVal);
    const temp = event.body.retVal;
    if (event.body.retVal === -1 && this.docType === 'BGTRQ') {
      const errorData = this.dialog.open(UploadErrorDetailsComponent, {
        width: '900px',
        data: {}
      });
      errorData.afterClosed().subscribe(result => {
        this.dialogRef.close();
      });
    } else if (this.docType === 'CMN' && event.body.retVal === -1) {
      this.errorService.showError(0, 'Failed', event.body.retMsg + '!');
    } else if (this.docType === 'CPXRQ' && event.body.retVal === -1) {
      this.errorService.showError(0, 'Failed', event.body.retMsg + '!');
    } else if (event.body.retVal === -1){
      this.errorService.showError(0, event.body.retMsg, " Please Rename Document"  );
      this.dialogRef.close();
    } else{
      this.dialogRef.close();
      this.errorService.showSuccess(event.body.retMsg);
    }
    this.result.emit(event.response);
  }

}
