import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AgGridAngular} from "ag-grid-angular";
import {GridApi} from "ag-grid-community";
import {CommonService} from "../../services/common.service";
import {QuoteDataDetailsService} from "../../services/quote-data-details.service";
import {SpinnerService} from "../../services/spinner.service";
import {MatDialog} from "@angular/material/dialog";
import {ErrorPopupComponent} from "../../shared/layouts/error-popup/error-popup.component";

@Component({
  selector: 'app-add-pharmacy',
  templateUrl: './add-pharmacy.component.html',
  styleUrls: ['./add-pharmacy.component.css']
})
export class AddPharmacyComponent implements OnInit {
  rowData: any = [];
  pharmacies: any = []
  @ViewChild('agGrid', {static: true}) ahGrid!: AgGridAngular;
  gridapi?: GridApi;
  zipcode: any;
  radius_miles: any = '10';
  pharmName: any = '';
  page: any = '0';
  mailchecked = false


  constructor(private route: Router,
              private commonservice: CommonService,
              private quoteDetailsService: QuoteDataDetailsService,
              private spinner: SpinnerService,
              private dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.zipcode = localStorage.getItem('zipcode')
    const pharmdata = localStorage.getItem('pharmdata')
    let pharmdataArray: any[] = [];
    if (pharmdata) {
      pharmdataArray = JSON.parse(pharmdata);
    }
    if(pharmdataArray.length !==0){
      this.rowData =pharmdataArray
    }
    this.findPharmacy(this.page,5)

  }

  colDef5 = function () {
    return '<img src="assets/delete.png" height="30" style="margin-top: -10px;" />';
  };
  columnDefs = [
    {
      field: 'index', headerName: '#', width: 80,
      valueGetter: (node: any) => String(node.node.rowIndex + 1)
    },
    {field: 'name', headerName: 'Pharmacy Name', filter: true, width: 250,flex: 1},
    {field: 'street', headerName: 'Address', filter: true, width: 250, flex: 1},
    {field: 'distance_miles', headerName: 'Distance', filter: true, width: 150},
    {
      field: 'delete',
      headerName: 'Action',
      cellRenderer: this.colDef5,
    },
  ];

  nav() {
    const npis = this.rowData.map((x: any) => x.npi)
    this.quoteDetailsService.setnpis(npis)
    localStorage.setItem('pharmacies', JSON.stringify(npis))
    localStorage.setItem('pharmdata', JSON.stringify(this.rowData))
    console.log('npis', npis)
    this.route.navigate(['Plans'])
  }

  check(event: any, data: any) {
    console.log("laassssss", data)
    console.log("laassssss", event.target.checked)
    if (data.checked == true) {
      if (this.rowData.length >= 5){

        this.dialog.open(ErrorPopupComponent,{
          data:{
            customMsg:'Pharmacy limit reached'},width: '600px'})
        event.target.checked =false
      }else {
        this.rowData.push(data);
      }

    } else {
      const index = this.rowData.findIndex((item: any) => item.npi === data.npi);
      if (index > -1) {
        // Item exists in the array, remove it
        this.rowData.splice(index, 1);
      }
    }
    // const index = this.rowData.findIndex((item:any) => item.name === data.name);
    // if (index > -1) {
    //   // Item exists in the array, remove it
    //   this.rowData.splice(index, 1);
    // } else {
    //   // Item doesn't exist in the array, add it
    //   this.rowData.push(data);
    // }
    this.gridapi?.setRowData(this.rowData)
  }

  onGridReady(params: any): void {
    this.gridapi = params.api;
  }

  onGridCellClicked(event: any): void {
    console.log(event.data)
    if (event.colDef.field === 'delete') {
      this.rowData.forEach((element: any, index: any) => {
        console.log(element)
        if (event.data.npi == element.npi) {
          console.log('delete')
          event.data.checked = false
          this.rowData.splice(index, 1)
          if (element.name === 'Mail Order Pharmacy'){
            this.mailchecked=false
          }
          console.log('after--delete', this.rowData)
          this.gridapi?.setRowData(this.rowData)
        }
      })

    }
  }

  findPharmacy(page: any,count:any) {
    const spine = this.spinner.start()
    this.commonservice.searchPharmacy(this.zipcode, this.radius_miles, this.pharmName, page,count).subscribe((response) => {
      if (response.status === true) {
        this.pharmacies = response.data.listOfPharmacy
        this.pharmacies = this.pharmacies.map((element: any, index: any) => {
          return {
            ...element,
            checked: false,
          }
        })
        this.page = response.data.total_results
      }
      this.spinner.stop(spine)
      console.log('pharmacy', response)
    })
    console.log(this.zipcode, this.radius_miles)
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex + 1;
    const endIndex = startIndex + event.pageSize;
    const pageSize =  event.pageSize;
    this.findPharmacy(startIndex,pageSize)
    console.log('startIndex', event)
    console.log('endIndex', endIndex)
  }

  mailOrder(event: any) {
    console.log('event---', event.target.checked)
    const index = this.rowData.findIndex((item: any) => item.name === 'Mail Order Pharmacy');
    if (index > -1) {
      // Item exists in the array, remove it
      this.rowData.splice(index, 1);
    } else {
      const data = {
        name: 'Mail Order Pharmacy',
        street: '',
        distance_miles: ''
      }
      if (this.rowData.length >= 5){
        this.dialog.open(ErrorPopupComponent,{
          data:{
            customMsg:'Pharmacy limit reached'},width: '600px'})
        event.target.checked =false

      }else{
        this.rowData.push(data);
      }

    }
    this.gridapi?.setRowData(this.rowData)
  }
  getRowHeight(params: any) {
    const lineHeight = 20; // Adjust this value to set the row height per line of text.
    const numLines = (params.data.name || '').split('\n').length;
    return (numLines + 1) * lineHeight; // Adding 1 to accommodate header height.
  }


  distanceChange() {
    this.findPharmacy('0',5)
  }

  updateExistPharm(){
    this.rowData.forEach((drugsObj:any) => {
      this.pharmacies.forEach((freobj:any)=>{
        if (freobj.npi === drugsObj.npi){
           freobj.checked = true
        }
      })

    });
  }
}
