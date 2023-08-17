import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../../services/common.service';
import {FormBuilder} from '@angular/forms';
import {ErrorDisplayService} from '../../../services/error-service.service';
import {GridApi, RowNode} from 'ag-grid-community';
import {SpinnerService} from '../../../services/spinner.service';
import {MatDialog} from '@angular/material/dialog';
import {not} from "rxjs/internal-compatibility";
import {element} from "protractor";

@Component({
  selector: 'app-io-dashboard',
  templateUrl: './io-dashboard.component.html',
  styleUrls: ['./io-dashboard.component.css']
})
export class IoDashboardComponent implements OnInit {
  @ViewChild('submitwarn', {static: true}) submitwarn!: TemplateRef<any>;
  pendingOrders: any;
  gridapi?: GridApi;
  selectedOrders: any = [];
  gridOptions: any;
  rowData = [];
  confirmeOrders: any = [];
  result: any = [];
  confirmeOrderIds: any = [];
  confirmedIO: any;
  headerCheck = false;
  columnDefs = [
    {
      field: 'index', headerName: '#', width: 80, headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true,
      valueGetter: (node: any) => String(node.node.rowIndex + 1)
    },
    {field: 'positionId', headerName: 'Position ID', filter: true, width: 100},
    {field: 'plant', headerName: 'Plant', filter: true, width: 100},
    {field: 'capexCode', headerName: 'Capex Code', filter: true, minWidth: 200, flex: 1},
    {field: 'amount', headerName: 'Amount', filter: true, width: 150},
    {field: 'orderDescription', headerName: 'Description', tooltipField: 'orderDescription', filter: true, width: 250},
    {field: 'orderCreation', headerName: 'Creation Date', filter: true, width: 150},
    {field: 'orderStatus', headerName: 'Status', filter: true, width: 150},
  ];
  columnDefs1 = [
    {field: 'positionId', headerName: 'Position ID', filter: true, width: 100},
    {field: 'plant', headerName: 'Plant', filter: true, width: 100},
    {field: 'capexCode', headerName: 'Capex Code', filter: true, minWidth: 200, flex: 1},
    {field: 'amount', headerName: 'Amount', filter: true, width: 150},
    {field: 'orderDescription', headerName: 'Description', filter: true, width: 250},
    {field: 'orderCreation', headerName: 'Creation Date', filter: true, width: 150},
    {field: 'orderStatus', headerName: 'Status', filter: true, width: 150},
  ];

  constructor(private commonService: CommonService,
              private fb: FormBuilder,
              private errorService: ErrorDisplayService,
              private route: Router,
              private spinnerService: SpinnerService,
              private dialog: MatDialog,
  ) {
    this.gridOptions = {
      defaultColDef: {
        filter: true
      },
    };
  }

  ngOnInit(): void {
    this.getAllPendingIOs();
  }

  create() {
    this.route.navigate(['create-io']);
  }

  getAllPendingIOs(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getAllPendingIOs().subscribe(
      (response) => {
        this.rowData = response.data;
        this.confirmedIO = response.data;
        this.spinnerService.stop(spinner);
        this.confirmeOrderIds = [];
        this.confirmeOrders = [];
      },
      (_: any) => {
        console.log('error');
        this.spinnerService.stop(spinner);
      },
    );
  }

  getInternalOrders(orderStatus: string): void {
    const spinner = this.spinnerService.start();
    this.commonService.getInternalOrders(orderStatus).subscribe(
      (response) => {
        this.rowData = response.data;
        this.spinnerService.stop(spinner);
        this.confirmeOrderIds = [];
        this.confirmeOrders = [];
      },
      (_: any) => {
        console.log('error');
        this.spinnerService.stop(spinner);
      },
    );
  }

  activitySelected(event: any): void {

    this.gridapi?.forEachNodeAfterFilter((rowNode: RowNode, index: number) => {
    });
    if (event.node.selected === true) {
      if (event.data.orderStatus === 'Pending') {
        this.confirmeOrders.push(event.data);
      }
      this.selectedOrders.push(event.data.orderId);
    } else if (event.node.selected === false) {
      const updateSelect = [];
      for (const el of this.selectedOrders) {
        if (el !== event.data.orderId) {
          updateSelect.push(el);
        }
      }
      this.confirmeOrders.forEach((elemnt: any, idx: number, _: any) => {
        if (elemnt.orderId === event.data.orderId) {
          this.confirmeOrders.splice(idx, 1)
        }
      })
      this.selectedOrders = updateSelect;
      console.log('all selct--', this.confirmeOrders);
    }
  }

  confirmInternlOrder(): void {
    this.dialog.closeAll();
    const spinner = this.spinnerService.start();
    console.log('selectedOrders', this.selectedOrders);
    if (this.confirmeOrderIds.length !== 0
    ) {
      this.commonService.confirmInternlOrder(this.confirmeOrderIds).subscribe(
        (response) => {
          if (response.retVal === 0) {
            this.getAllPendingIOs();
            this.spinnerService.stop(spinner);
          }
          this.confirmeOrderIds = [];
          this.confirmeOrders = [];
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          console.log('error');
        },
      );
    } else {
      this.spinnerService.stop(spinner);
      this.errorService.showError('Please Select Item for confirm order', 'Need to select at least on internal request');
    }
  }

  downloadIOrders()
    :
    void {

    if (this.selectedOrders.length !== 0
    ) {
      this.commonService.downloadIOrders(this.selectedOrders).subscribe((resp => {
        const url = window.URL.createObjectURL(resp);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = 'IOrders.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      }));
    } else {
      this.errorService.showError('Please select atleat one order to download');
    }
  }

  clearFilter() {
    // this.gridOptions.api.setFilterModel(null);
    this.getAllPendingIOs();
    this.selectedOrders = [];
  }

  popOrder() {
    this.confirmeOrderIds = []
    this.confirmeOrders.forEach((elem: any, index: any, _: any) => {
      if (elem.orderStatus === 'Pending') {
        this.confirmeOrderIds.push(elem.orderId);
      }
    })
    console.log('idsssss---', this.confirmeOrderIds)
    const pop = this.dialog.open(this.submitwarn, {width: '600px'});

  }

  getRowHeight(params: any) {
    // Calculate the row height based on the content size
    const lineHeight = 20; // Average line height in pixels
    const lines = (params.data.orderDescription || '').split('\n').length; // Count lines in description
    return 80 + lines * lineHeight; // Base height + additional height for lines
  }
}
