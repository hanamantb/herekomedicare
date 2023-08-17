import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {ErrorDisplayService} from '../../services/error-service.service';
import {MatDialog} from '@angular/material/dialog';
import {SpinnerService} from '../../services/spinner.service';
import {CommonService} from '../../services/common.service';
import {takeUntil} from 'rxjs/operators';
import {getAllKeysInObjects} from 'ag-grid-community/dist/lib/utils/object';
import {AppConstants} from '../../helpers/AppConstants';
import {RowNode, GridApi} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';
import {MastersService} from "../../services/masters.service";

@Component({
  selector: 'app-approved-requests',
  templateUrl: './approved-requests.component.html',
  styleUrls: ['./approved-requests.component.css']
})
export class ApprovedRequestsComponent implements OnInit {
  @ViewChild('agGrid', {static: true}) ahGrid!: AgGridAngular;
  selectedRequests: any = [];
  gridapi?: GridApi;
  fyi = ''
  rowData = [];
  private ngUnsubscribe = new Subject();

  constructor(private route: Router,
              private dialog: MatDialog,
              private errorService: ErrorDisplayService,
              private spinnerService: SpinnerService,
              private commonService: CommonService,
              private masterService: MastersService) {
  }

  colDef4 = function () {
    return '<img src="assets/goto.png" height="32" width="34" style=" margin-top: 5px; margin-left: 25px"/>';
  };

  columnDefs = [
    {
      field: 'index', checkboxSelection: true, headerName: '#', width: 80, headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      valueGetter: (node: any) => String(node.node.rowIndex + 1)
    },
    {field: 'more', headerName: 'View More', filter: true, width: 100, cellRenderer: this.colDef4},
    {field: 'requstId', headerName: 'requstId', filter: true, width: 120, hide: true},
    {field: 'budgetId', headerName: 'Budget Id', filter: true, width: 200},
    {field: 'requester', headerName: 'Requester', filter: true, width: 110},
    {field: 'department', headerName: 'Department', filter: true, width: 110},
    {field: 'plantName', headerName: 'Plant Name', filter: true, width: 230},
    {field: 'catgry', headerName: 'Category', filter: true, width: 100},
    {field: 'invstmntType', headerName: 'Type Of Investment', filter: true, width: 150},
    {field: 'invstmntPurpose', headerName: 'Purpose of Investment', filter: true, width: 180},
    {field: 'qty', headerName: 'Qty', filter: true, width: 70, type: 'rightAligned'},
    {field: 'aproxVal', headerName: 'Approx Value', filter: true, width: 120, type: 'rightAligned'},
    {field: 'balance', headerName: 'Balance Value', filter: true, width: 120, type: 'rightAligned'},
    {field: 'payback', headerName: 'Pay Back', filter: true, width: 100},
    {field: 'payBackPeriod', headerName: 'Pay Back Period', filter: true, width: 130},
    {field: 'details', headerName: 'investment Justification', filter: true, width: 180},
    {field: 'remarks', headerName: 'Remarks', filter: true, width: 150},
    {field: 'pending', headerName: 'Pending', filter: false, width: 120},

  ];

  ngOnInit(): void {
    this.getAllApprovedRequests();
  }

  getAllApprovedRequests(): void {
    const spinner = this.spinnerService.start();
    this.masterService.events$.subscribe(event => {
      console.log('eeeeeeeeevvvvvvvvvvv', event)
      this.fyi = event
    });
    this.commonService.getAllApprovedRequests(this.fyi)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
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

  onGridCellClicked(event: any): void {
    const requstId = event.data.requstId;
    console.log('appid', requstId)
    if (event.colDef.field === 'more') {
      sessionStorage.setItem(AppConstants.requestId, requstId);
      this.route.navigate(['/request-details']);
    }
  }

  activitySelected(event: any): void {
    console.log(event.data);
    this.gridapi?.forEachNodeAfterFilter((rowNode: RowNode, index: number) => {

    });
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

    }
    console.log(this.selectedRequests);
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

  grtFyi() {
    this.masterService.events$.subscribe(event => {
      console.log('eeeeeeeeevvvvvvvvvvv', event)
      this.fyi = event
    })
  }

  dashboard() {
    this.masterService.summary()
  }

}
