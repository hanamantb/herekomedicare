import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FileUploadComponent} from '../../../general/file-upload/file-upload.component';
import {MatDialog} from '@angular/material/dialog';
import {AppConstants} from '../../../helpers/AppConstants';
import {Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {CryptoService} from '../../../helpers/crypto.service';
import {SpinnerService} from '../../../services/spinner.service';
import {ErrorDisplayService} from '../../../services/error-service.service';
import {CommonService} from '../../../services/common.service';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {GridApi, RowNode, ValueCache} from 'ag-grid-community';
import {FormControl, FormGroup} from '@angular/forms';
import {Condition} from 'selenium-webdriver';
import {element} from 'protractor';

@Component({
  selector: 'app-capex-budget-approval-more-details',
  templateUrl: './capex-budget-approval-more-details.component.html',
  styleUrls: ['./capex-budget-approval-more-details.component.css']

})
export class CapexBudgetApprovalMoreDetailsComponent implements OnInit {
  @ViewChild('beforeApprove', {static: true}) beforeApprove!: TemplateRef<any>;
  @ViewChild('rejectWarning', {static: true}) rejectWarning!: TemplateRef<any>;
  @ViewChild('approveWarning', {static: true}) approveWarning!: TemplateRef<any>;
  gridapi?: GridApi;
  apprvRemarks = '';
  rejectReson = '';
  cnnt = '';
  retMsg = '';
  selectedList: Select[] = [];
  fileIds: any = [];
  budgetCheckMatches: any;
  sumofbudgetamount = 0;
  sumofRequests = 0;
  rolevalid: boolean = false;
  sumOfBudget = 0;
  summ = 0;
  rowData = [];
  docIds = []
  dataList: any [] = [];
  filtrdatalist: any [] = [];
  username = '';
  pendingWithId: any;
  balance = 0;
  // requestIds = [];
  budgetForm: FormGroup = new FormGroup({
    budgetSelect: new FormControl()
  });

  contagious: any;
  budgetAmount: any;
  RequestedAmount: any;
  count: any;
  rqstSubmitted: any;
  rqstRejected: any;
  rqstApproved: any;
  displayedColumns = ['Department', 'Plant Code', 'Plant Name', 'Category / Brand', 'Type of investment',
    'Purpose of investment', 'Investment Purpose Details', 'QTY required ', 'Approx Value',
    'Pay back', 'Pay back period', 'Remark'];
  dataSource: any;
  private ngUnsubscribe = new Subject();
  role = '';
  budgetStatus = '';
  panelOpenState = false;
  headerData: HeaderData = {
    budgetCd: '',
    budgetDesc: '',
    budgetAmount: 0,
    requestdBy: '',
    cretnDate: '',
    contigious: false,
    budgetStatus: '',
    pendingWith: '',
    invstmntType: '',
    Plant: '',
  };

  requestDetails!: BudgetRqst[];
  approvalId: any;
  budgetHistory: any = [];
  values: any[] = [];
  selectedIndex: any;
  selectedidamount: any[] = [];

  // tslint:disable-next-line:only-arrow-functions
  colDef4 = function () {
    return '<img src="assets/download.png" height="32" width="34" style=" margin-top: 5px; margin-left: 15px"/>';
  };
  colDef5 = function () {
    return '<img src="assets/delete.png" height="32" width="34" style=" margin-top: 5px; margin-left: 15px"/>';
  };


  columnDefs = [
    {
      field: 'index', checkboxSelection: true, headerName: '#', width: 80, headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      valueGetter: (node: any) => String(node.node.rowIndex + 1)
    },
    {field: 'docName', headerName: 'Document Name', filter: true, width: 420},
    //{field: 'docType', headerName: 'Document Type', filter: true, width: 130},
    {field: 'download', headerName: 'Download', filter: true, width: 130, cellRenderer: this.colDef4},
    {field: 'delete', headerName: 'Delete', filter: true, width: 130, cellRenderer: this.colDef5}
  ];


  constructor(private dialog: MatDialog,
              private route: Router,
              private cookie: CookieService,
              private errorService: ErrorDisplayService,
              private spinnerService: SpinnerService,
              private commonService: CommonService,
              private cryptoService: CryptoService) {
    this.role = this.cryptoService.decryptData(this.cookie.get(AppConstants.role));
    console.log('role', this.role);
    this.approvalId = sessionStorage.getItem(AppConstants.approvalId);
    // this.requestId = sessionStorage.getItem(AppConstants.requestId);
  }

  ngOnInit(): void {
    this.getCommonDetailsOfBudget();
    this.getAllApprovalDocument();
    this.getAllBudgetIds();
    this.username = this.cryptoService.decryptData(this.cookie.get(AppConstants.USERNAME));

  }

  searchinvest(event: any): void {
    console.log(event.target.value);
    this.dataList = this.filtrdatalist
    const keyword = event.target.value.toLowerCase();
    const datalist = this.dataList.filter(data => data.Detail.toLowerCase().includes(keyword));
    this.dataList = datalist
  }


  getCommonDetailsOfBudget(): void {
    const approvalId = parseInt(this.approvalId);
    const spinner = this.spinnerService.start();
    this.commonService.getCommonDetailsOfBudget(approvalId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            let userId = response.user.id;
            this.pendingWithId = response.data.pendingWith;
            console.log('pendingWithId', this.pendingWithId);
            if (userId == this.pendingWithId) {
              this.rolevalid = true
            }
            console.log('common details', response.data);
            this.headerData = response.data;
            this.contagious = this.headerData.contigious;
            this.budgetStatus = this.headerData.budgetStatus;
            this.balance = this.headerData.budgetAmount
            this.getBudgetRequestDetails();
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  upload(): void {
    const uploadPopup = this.dialog.open(FileUploadComponent, {
      data: {docType: 'CPXRQ'}, // capex approval
      width: '900px'
    });
    uploadPopup.afterClosed().subscribe(result => {
      this.getAllApprovalDocument();
    });
  }

  onGridCellClicked(event: any): void {
    if (event.colDef.field === 'download') {
      this.fileIds = event.data.docId;
      const docName = event.data.docName;
      this.downloadDocument(this.fileIds, docName);
    } else if (event.colDef.field === 'delete') {
      console.log(event.data.CretnBy)
      console.log(this.pendingWithId)
      if (this.pendingWithId === event.data.CretnBy.toString()) {
        const docId = event.data.docId;
        this.deleteApprovalDocument(docId);
      } else {
        this.errorService.showError(0, 'Invalid Action', 'You cant delete the Document !');
      }
    }
  }

  iddetails: any [] = []

  getBudgetRequestDetails(): void {
    const approvalId = parseInt(this.approvalId);
    console.log('request approvalId', this.approvalId)
    this.commonService.getBudgetRequestDetails(approvalId).subscribe(
      (response => {
        this.requestDetails = response.data
        this.requestDetails.forEach((element, index, _) => {
          this.summ += element.budgetAmount;
          this.balance -= element.budgetAmount;
          this.iddetails.push({
            requestId: element.requestIds
          })
        })

        console.log('request details', this.summ)


      }));
  }

  getRequestDetailsHistory(requestId: any): void {
    console.log(requestId)
    this.commonService.getRequestDetailsHistory(requestId).subscribe(
      (response => {
        if (response.retVal !== 0) {
          this.errorService.showError(0, 'Failed', response.retMsg + '!');
        } else {
          this.budgetHistory = response.data;
          this.dataSource = this.budgetHistory;
          console.log('getRequestDetailsHistory', this.dataSource)
        }
      })
    );
// this.getBudgetRequestDetails();
  }

  // document upload in approval-details screen
  getAllApprovalDocument(): void {
    const approvalId = parseInt(this.approvalId)
    const spinner = this.spinnerService.start();
    this.commonService.getAllApprovalDocument(approvalId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            console.log('docs', response.data);
            this.rowData = response.data;
            this.rowData.forEach((elem, index, _) => {
              this.docIds.push(elem['docId'])
              console.log('docs', elem['docId']);
            })

          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }


  deleteApprovalDocument(docId: number): void {
    const spinner = this.spinnerService.start();
    this.commonService.deleteApprovalDocument(docId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {

            this.errorService.showSuccess(response.retMsg);
            this.getAllApprovalDocument();
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );

    // console.log("insideeeeeeeee"+this.deleteApprovalDocument(docId))

  }

  downloadDocument(docId: any, docName: string): void {
    let phase = 2
    console.log('docid : ' + docId + ' - ' + 'docname : ' + docName);
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
    /*New Api should trigger */
    /*Accrding to boolen popup shoul open */
    if (this.budgetCheckMatches == null) {
      this.budgetCheck();
    }
    if (this.budgetCheckMatches == 1) {
      this.dialog.open(this.approveWarning, {width: '600px'});
    } else if (this.budgetCheckMatches == 2) {
      this.openbeforeApprove()
    } else if (this.budgetCheckMatches == 3) {
      // this.openRejectWarning()
      this.errorService.showError(0, 'Invalid Action!', 'Requested amount is greater than budget amount!');
    }


  }

  openbeforeApprove(): void {
    this.dialog.open(this.beforeApprove, {width: '600px'});
  }

  budgetCheck(): void {
    const approvalId = parseInt(this.approvalId);

    if (this.localsaved.length == 0) {
      const spinner = this.spinnerService.start();
      this.commonService.budgetCheck(approvalId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (response) => {
            console.log(response)
            this.budgetCheckMatches = response.retVal;
            this.budgetAmount = response.budgetAmount;
            this.RequestedAmount = response.sumOfAmnt;
            console.log('Condition', response);
            this.openApproveWarning();
            this.spinnerService.stop(spinner);
          })
    } else {
      this.errorService.showError(0, 'Please Contingency Budgtes ', 'Please Click on Save in Contingency Budgtes');
    }
  }

  openRejectWarning(): void {
    this.dialog.open(this.rejectWarning, {width: '600px'});
  }

  approveRequest(): void {
    const approvalId = parseInt(this.approvalId);
    const spinner = this.spinnerService.start();
    this.commonService.approveBudgetToNxtLevel(approvalId, this.apprvRemarks)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          console.log(response.data);
          if (response.retVal != 0){
            this.errorService.showError(response.retMsg)
          }else{
            this.errorService.showSuccess('Approved Successfully');
            this.route.navigate(['/capex-budget-pending']);
          }

          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  rejectRequest(): void {

    console.log('rejected');
    const approvalId = parseInt(this.approvalId);
    const rejectReson = this.rejectReson;
    const spinner = this.spinnerService.start();
    this.commonService.rejectBudget(this.approvalId, this.rejectReson)
      .subscribe(
        (response) => {
          if (response.retVal != 0) {
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            console.log(response.data);
            this.errorService.showSuccess('Rejected succesfully');
            this.route.navigate(['/capex-approval']);
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  getAllBudgetIds(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getAllBudgetIds()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
          } else {
            this.dataList = response.data;
            this.filtrdatalist = response.data;
            this.iddetails.forEach((elment, index, _) => {
              const datalist = this.dataList.filter(data => data.requestId !== parseInt(elment.requestId));
              this.dataList = datalist;
            })


            console.log('datalist', this.dataList);
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  findAbsentIds(requestIds: number[]): number[] {
    const resultArray: any[] = [];
    this.localsaved.forEach((elements: any, index: number, _) => {
      if (requestIds.indexOf(elements.requestId) === -1) {
        resultArray.push(elements.requestId);
      }
    });
    return resultArray;
  }

  onSelectBudget(): void {
    const requestIds: any[] = this.budgetForm.value.budgetSelect;
    const difference: number[] = this.findAbsentIds(requestIds);
    if (difference.length > 0) {
      requestIds.push(difference[0]);
      this.budgetForm.patchValue({
        budgetSelect: requestIds
      });
      this.errorService.showError(0, 'Invalid Action', 'This request id is already selected.' +
        'it can\'t be unselected. you can remove it from below.');
      return;
    }
    this.selectedList = [];
    const spinner = this.spinnerService.start();
    this.commonService.getDetailesOfSelectedRequests(requestIds)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
          } else {
            const tempSelectedList: any[] = response.data;
            for (const amount of tempSelectedList) {
              amount.availAmount = amount.amount;
              amount.amount = 0;
              amount.investmentId = amount.investment_id;
              this.selectedidamount.forEach((elment: any, index, _) => {
                console.log('amount', amount, 'element', elment);
                if (elment.id === amount.requestId) {
                  amount.amount = elment.amount;
                }

              });
              this.selectedList.push(amount);
            }
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );

  }

  localsaved: any[] = []

  localsavedcross(amount: number, requestId: number): void {
    this.summ += amount;
    console.log(this.summ);
    if (amount !== 0) {
      if (this.headerData.budgetAmount < this.summ) {
        this.errorService.showError(0, 'Invalid Action!', 'Budget amount is greater than Capex!');
        this.summ -= amount;
      } else {
        this.balance -= amount;
        this.localsaved.push({amount: amount, requestId: requestId});
        console.log(this.localsaved);
        this.changeColor(requestId);
        this.selectedidamount.push({
          id: requestId, amount: amount
        });
      }
    } else {
      this.errorService.showError(0, 'Entered Budget amount is 0', 'Zero is not acceptable.');
    }
  }

  localdeletecross(requestId: number, amount: number): void {

    console.log(this.selectedList)
    console.log(this.selectedidamount, 'idamt')

    // @ts-ignore
    this.selectedList.find(item => item.requestId == requestId).amount = 0
    // console.log(amount)

    this.localsaved.forEach((elemnt, idx: number, _) => {
      if (elemnt.requestId === requestId) {
        this.summ -= elemnt.amount;
        this.balance += elemnt.amount;
        this.localsaved.find(item => item.requestId == requestId).amount = 0
        this.selectedidamount.find(item => item.id == requestId).amount = 0
        this.localsaved.splice(idx, 1);

      }
      console.log('summ', this.summ);
    });


    this.values.forEach((elment, idx: number, _) => {
      if (elment === requestId) {
        this.values.splice(idx, 1);
      }
    });
    this.selectedList.forEach((elemente, idx: number, _) => {
      if (elemente.requestId === requestId) {
        this.selectedList.splice(idx, 1);

      }
    });
    const requestIds: any[] = this.budgetForm.value.budgetSelect;
    const index = requestIds.indexOf(requestId);
    if (index !== -1) {
      requestIds.splice(index, 1);
      this.budgetForm.patchValue({
        budgetSelect: requestIds
      });
    }
    console.log('localdelete', this.localsaved);
    console.log('values', this.values);
  }


  submit() {

    if (this.localsaved.length === 0) {
      this.errorService.showError(0, 'Request Id Missing', 'Atleast one Request Id should be Selected.');
    } else {
      let i = 0;
      const ids: any[] = [];
      this.localsaved.forEach((elemen, index, _) => {
        this.saveBudgetAmount(elemen.amount, elemen.requestId);
        ids.push(elemen.requestId);
        i = i + 1
      });
      console.log('count', i);
      if (this.localsaved.length === i) {
        this.saverequestids(ids);
        this.selectedList = [];
        this.localsaved = [];
      }
      this.getCommonDetailsOfBudget();
      this.getBudgetRequestDetails();
      this.getAllApprovalDocument();
      this.getAllBudgetIds();
    }
  }


  saveBudgetAmount(amount: number, requestId: number): void {
    const approvalId = this.approvalId;
    console.log(this.summ)
    if (this.headerData.budgetAmount < this.summ) {
      this.errorService.showError(0, 'Invalid Action!', 'Reuested amount is greater than Capex!');
    } else {
      this.commonService.saveBudgetAmountcross(requestId, amount, this.approvalId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (response) => {
            if (response.retVal !== 0) {
              this.errorService.showError(0, 'Failed', response.retMsg + '!');
              // console.log('submit', this.submit)
            } else {
              this.errorService.showSuccess('Successfully Saved');
              // this.submit = 1

              // this.savecrossutilisation(requestId, amount);

              this.sumOfBudgets(amount);
              this.retMsg = '1'
            }

          },
          (_: any) => {

          },
        );
    }
  }

  sumOfBudgets(amount: number) {
    this.sumOfBudget += amount
  }

  savecrossutilisation(requestId: any, budgetAmount: any) {
    const spinner = this.spinnerService.start();
    console.log('appid', requestId, budgetAmount)
    this.approvalId = parseInt(this.approvalId)
    this.sumOfBudgetAmounts(budgetAmount)
    this.commonService.savecrossutilisation(this.approvalId, requestId, budgetAmount)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.spinnerService.stop(spinner);
            this.errorService.showError(0, 'Failed', response.retMsg + '!');
          } else {
            console.log(response)
            this.spinnerService.stop(spinner);

            // this.changeColor(i);
            this.errorService.showSuccess('successfully saved');

          }
        }
      )


  }

  sumOfBudgetAmounts(budgetAmount: number) {
    let i = 0
    this.count = i + 1
    this.sumofbudgetamount += budgetAmount
  }

  changeColor(i: number): void {
    this.values.push(i);
    console.log('value', this.values);
    this.selectedIndex = i;

  }

  isBudgetSaved(i: number): boolean {
    let budgetSaved = false;

    // check if index is present in values array
    budgetSaved = this.values.indexOf(i) !== -1;

    return budgetSaved;

  }


  mailToCrossUtilisation() {
    const approvalId = parseInt(this.approvalId);
    const spinner = this.spinnerService.start();
    this.commonService.mailToCrossUtilisation(this.approvalId).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          console.log(response)
          this.route.navigate(['/capex-approval']);
          this.errorService.showSuccess('Sended mail success');
          this.spinnerService.stop(spinner);
        })
    this.spinnerService.stop(spinner);
  }

  saverequestids(requestIds: any) {
    console.log('req-id', requestIds);
    const approvalId = parseInt(this.approvalId);
    const spinner = this.spinnerService.start();
    if (this.count !== requestIds.length) {
      // this.errorService.showError(0, 'Failed cross utilisation for all selected budgets no saved' + '!');
    }
    this.commonService.saverequestids(this.approvalId, requestIds).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          console.log(response)
          this.spinnerService.stop(spinner);
          this.errorService.showSuccess('Saved Successfully');
        })
    this.budgetForm.reset()
    this.spinnerService.stop(spinner);
  }


  activitySelected(event: any): void {
    console.log(event.data);
    this.gridapi?.forEachNodeAfterFilter((rowNode: RowNode, index: number) => {

    });
    if (event.node.selected === true) {
      this.fileIds.push(event.data.approvalId);
    } else if (event.node.selected === false) {
      const updateSelect = [];
      for (const el of this.fileIds) {
        if (el !== event.data.approvalId) {
          updateSelect.push(el);
        }
      }
      this.fileIds = updateSelect;

      // this.selectedRequests.pop(event.data.tempId);
    }
    console.log(this.fileIds);
  }

  downloadAllDocs() {
    for(let id of this.rowData){
      let phase = 2
      this.commonService.downloadDocument(id['docId'], phase).subscribe((resp => {
        const url = window.URL.createObjectURL(resp);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = id['docName'];
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
        // this.toastr.success('Successfully Downloaded', '');
      }));
    }

  }

}

interface Select {
  requestId: number;
  budgetId: string;
  amount: number;
  availAmount: number;
  investmentId: number;
}

interface HeaderData {
  budgetCd: string;
  budgetDesc: string;
  budgetAmount: number;
  requestdBy: string;
  cretnDate: string;
  contigious: boolean;
  budgetStatus: string;
  pendingWith: string,
  invstmntType: string,
  Plant: string,
}

interface BudgetRqst {
  budgetIds: string;
  budgetAmount: number;
  requestIds: [];

}

interface budgetHistory {
  department: string;
  plantCd: string;
  plantName: string;
  catgry: string;
  invstmntType: string;
  invstmntPurpose: string;
  purposeDetails: string;
  qty: number;
  aproxVal: number;
  payback: string;
  payBackPeriod: string;
  remarks: string;

}




