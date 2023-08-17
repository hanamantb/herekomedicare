import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {takeUntil} from 'rxjs/operators';
import {ErrorDisplayService} from '../../../services/error-service.service';
import {SpinnerService} from '../../../services/spinner.service';
import {CommonService} from '../../../services/common.service';
import {forkJoin, Subject} from 'rxjs';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.css']
})
export class EditRequestComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  deparmentList!: Department[];
  categories!: Category[];
  plants!: Plants[];
  purposes!: Purposes[];
  investmentTypes!: Types[];
  department = '';
  payBack = '';
  remarks = '';
  qty = 0;
  catgryId = 0;
  plantId = 0;
  purposeId = 0;
  typeId = 0;
  appxVal = 0;
  payBackPeriod = '';
  requestId = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private errorService: ErrorDisplayService,
              private spinnerService: SpinnerService,
              private commonService: CommonService,
              private dialogeRef: MatDialogRef<EditRequestComponent>) {
  }

  ngOnInit(): void {
    this.requestId = this.data.data.requstId;
    this.qty = this.data.data.qty;
    this.appxVal = this.data.data.amount;
    this.department = this.data.data.department;
    this.payBack = this.data.data.payBack;
    this.payBackPeriod = this.data.data.payBackPeriod;
    this.remarks = this.data.data.remarks;
    this.catgryId = this.data.data.catgryId;
    this.plantId = this.data.data.plantId;
    this.purposeId = this.data.data.purposeId;
    this.typeId = this.data.data.typeId;

    this.getAllDataToEditPopup();

  }

  getAllDataToEditPopup(): void {
    const spinner = this.spinnerService.start();
    forkJoin([
      this.commonService.getAllCategories(),
      this.commonService.getAllPlants(),
      this.commonService.getAllInvstmntPurpose(),
      this.commonService.getAllInvstmntType(),
    ]).subscribe(
      (response) => {
        this.categories = response[0].data;
        this.plants = response[1].data;
        this.purposes = response[2].data;
        this.investmentTypes = response[3].data;
        this.spinnerService.stop(spinner);
      },
      (_: any) => {
        this.spinnerService.stop(spinner);
      },
    );
  }

  updateRequest(): void {
    const spinner = this.spinnerService.start();
    this.commonService.updateBudgetRequest( this.requestId, this.plantId, this.catgryId, this.typeId, this.purposeId, this.qty,
      this.appxVal, this.payBack, this.payBackPeriod, this.remarks)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            this.dialogeRef.close();
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

interface Department {
  departmentId: number;
  department: string;
}

interface Category {
  catgryId: number;
  catgryName: string;
}

interface Plants {
  plantId: number;
  plantName: string;
}

interface Purposes {
  purposeId: number;
  name: string;
}

interface Types {
  typeId: number;
  name: string;
}
