import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {ErrorDisplayService} from '../../services/error-service.service';
import {MatDialog} from '@angular/material/dialog';
import {SpinnerService} from '../../services/spinner.service';
import {CommonService} from '../../services/common.service';
import {Subject} from 'rxjs';
import {AppConstants} from '../../helpers/AppConstants';
import {RowNode, GridApi} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';
import {MastersService} from "../../services/masters.service";

@Component({
  selector: 'app-submitted-requests',
  templateUrl: './submitted-requests.component.html',
  styleUrls: ['./submitted-requests.component.css']
})
export class SubmittedRequestsComponent implements OnInit {
  @ViewChild('agGrid', {static: true}) ahGrid!: AgGridAngular;
  selectedRequests: any = [];
  gridapi?: GridApi;
  rowData = [];
  fyi = '';
  private ngUnsubscribe = new Subject();

  constructor(private route: Router,
              private dialog: MatDialog,
              private errorService: ErrorDisplayService,
              private spinnerService: SpinnerService,
              private commonService: CommonService,
              private masterService: MastersService) {
  }

  colDef4 = function () {
    return '<img src="assets/goto.png" height="24" width="22" style=" margin-top: 5px; margin-left: 25px;text-align: center"/>';
  };

  columnDefs = [
    {
      field: 'index', checkboxSelection: true, headerName: '#', width: 80, headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      valueGetter: (node: any) => String(node.node.rowIndex + 1)
    },
    {field: 'more', headerName: 'View More', filter: true, width: 100, cellRenderer: this.colDef4},
    {field: 'requstId', headerName: 'requstId', filter: true, width: 120, hide: true},
    {field: 'budgetId ', headerName: 'Budget Id', filter: true, width: 200},
    {field: 'department', headerName: 'Department', filter: true, width: 110},
    {field: 'requester', headerName: 'Requester', filter: true, width: 110},
    {field: 'plantName', headerName: 'Plant Name', filter: true, width: 230},
    {field: 'catgry', headerName: 'Category', filter: true, width: 100},
    {field: 'invstmntType', headerName: 'Type Of Investment', filter: true, width: 150},
    {field: 'invstmntPurpose', headerName: 'Purpose of Investment', filter: true, width: 180},
    {field: 'qty', headerName: 'Qty', filter: true, width: 70, type: 'rightAligned'},
    {field: 'aproxVal', headerName: 'Approx Value', filter: true, width: 120, type: 'rightAligned'},
    {field: 'payback', headerName: 'Pay Back', filter: true, width: 100},
    {field: 'payBackPeriod', headerName: 'Pay Back Period', filter: true, width: 130},
    {field: 'details', headerName: 'Investment Justification', filter: true, width: 180},
    {field: 'remarks', headerName: 'Remarks', filter: true, width: 180},
    {field: 'pending', headerName: 'Pending', filter: false, width: 120},


  ];

  colDef5 = function () {
    return '<img src="assets/edit.png" height="24" width="22" style=" margin-top: 5px; margin-left: 5px"/>';
  };

  ngOnInit(): void {
    this.getAllPendingRequests();
  }

  getAllPendingRequests(): void {
    const spinner = this.spinnerService.start();
    this.masterService.events$.subscribe(event => {
      console.log('eeeeeeeeevvvvvvvvvvv', event)
      this.fyi = event
    });
    this.commonService.getAllPendingRequests(this.fyi)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
          } else {
            this.rowData = response.data;
            console.log(response.data);
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
      sessionStorage.setItem(AppConstants.requestId, requestId);
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

  dashboard() {
    this.masterService.summary()
  }
}
