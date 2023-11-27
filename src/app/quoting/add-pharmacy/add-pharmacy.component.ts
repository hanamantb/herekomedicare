import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AgGridAngular} from "ag-grid-angular";
import {GridApi} from "ag-grid-community";
import {CommonService} from "../../services/common.service";
import {QuoteDataDetailsService} from "../../services/quote-data-details.service";
import {SpinnerService} from "../../services/spinner.service";
import {MatDialog} from "@angular/material/dialog";
import {ErrorPopupComponent} from "../../shared/layouts/error-popup/error-popup.component";
import { NoPharmaciesPopupComponent } from '../../shared/layouts/no-pharmacies-popup/no-pharmacies-popup.component';

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
  ribbonShow = false


  constructor(private route: Router,
              private commonservice: CommonService,
              private quoteDetailsService: QuoteDataDetailsService,
              private spinner: SpinnerService,
              private dialog:MatDialog) {
  }

  ngOnInit(): void {
    this.zipcode = sessionStorage.getItem('zipcode')
    const pharmdata = sessionStorage.getItem('pharmdata')
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
    return '<i class="material-icons action-btns">delete_outline</i>';
  };
  columnDefs = [
    {
      field: 'index', headerName: 'Sl. No.', width: 80,
      valueGetter: (node: any) => String(node.node.rowIndex + 1)
    },
    {field: 'name', headerName: 'Pharmacy Name', filter: true, width: 250,flex: 1},
    {field: 'street', headerName: 'Address', filter: true, width: 250, flex: 1},
    {field: 'distance_miles', headerName: 'Distance (Miles)', filter: true, width: 150},
    {
      field: 'delete',
      headerName: 'Action',
      cellRenderer: this.colDef5,
    },
  ];

  nav() {
    const npis = this.rowData.map((x: any) => x.npi)
    this.quoteDetailsService.setnpis(npis)
    sessionStorage.setItem('pharmacies', JSON.stringify(npis))
    sessionStorage.setItem('pharmdata', JSON.stringify(this.rowData))
    console.log('npis', npis)
    this.route.navigate(['Plans'])
  }

  check(event: any, data: any) {
    console.log("laassssss", data)
    console.log("laassssss", event.target.checked)
    if (data.checked == true) {
      if(!this.mailchecked){
      if (this.rowData.length >= 5){
        this.dialog.open(ErrorPopupComponent,{
          data:{
            customMsg:'You have already selected 5 pharmacies. Remove one of the selected pharmacies and add this pharmacy.'},width: '600px'})
        event.target.checked =false
      }else {
        this.rowData.push(data);
      }
    }else{
      if (this.rowData.length >= 6){
        this.dialog.open(ErrorPopupComponent,{
          data:{
            customMsg:'You have already selected 5 pharmacies. Remove one of the selected pharmacies and add this pharmacy.'},width: '600px'})
        event.target.checked =false
      }else {
        this.rowData.push(data);
      }
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
    this.pharmacies=[]
    this.commonservice.searchPharmacy(this.zipcode, this.radius_miles, this.pharmName, page,count).subscribe((response) => {
      if (response.status === true) {
        this.pharmacies = response.data.listOfPharmacy
        this.pharmacies = this.pharmacies.map((element: any, index: any) => {
          return {
            ...element,
            checked: false,
          }
        })
        console.log('this.rowData',this.rowData)
        if(this.rowData.length !== 0){
         this.rowData.forEach((checked:any) => {
           this.pharmacies.map((element: any, index: any) => {
            if(checked.npi === element.npi){
              element.checked = true;
            }
          })
         });
        }
        
        this.page = response.data.total_results
      }else{
        this.dialog.open(ErrorPopupComponent, {
          data: {
            buttons: true,
            customMsg: 'We couldn\'t find any pharmacies matching your search in this area.'
          }
        })
      }
      this.spinner.stop(spine)
      console.log('pharmacy', response)
    })
    console.log(this.zipcode, this.radius_miles)
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex;
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
      this.mailchecked = true
      const data = {
        name: 'Mail Order Pharmacy',
        street: '',
        distance_miles: ''
      }
      if (this.rowData.length >= 6){
        this.dialog.open(ErrorPopupComponent,{
          data:{
            customMsg:'You have already selected 5 pharmacies. Remove one of the selected pharmacies and add this pharmacy.'},width: '600px'})
        event.target.checked =false

      }else{
        this.rowData.push(data);
      }

    }
    this.gridapi?.setRowData(this.rowData)
  }


  distanceChange() {
    this.findPharmacy('0',5)
  }

  openNoPharmacies() {
    this.dialog.open(NoPharmaciesPopupComponent);
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
  getRowHeight(params: any) {
    // Calculate the row height based on the content size
    const lineHeight = 20; // Average line height in pixels
    const lines = (params.data.name || '').split('\n').length; // Count lines in description
    return 50 + lines * lineHeight; // Base height + additional height for lines
  }

  delete(data:any){
  this.rowData.forEach((element: any, index: any) => {
          console.log(element)
          if (data.npi == element.npi) {
            console.log('delete')
            data.checked = false
            this.rowData.splice(index, 1)
            if (element.name === 'Mail Order Pharmacy'){
              this.mailchecked=false
            }
            console.log('after--delete', this.rowData)
            this.gridapi?.setRowData(this.rowData)
          }
        })
  }

  @HostListener('window:scroll', ['$event'])
    scroll(event: Event) {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // Check if the user is near the bottom of the page
      if (scrollY + windowHeight >= documentHeight - 130 ) {
        console.log('scrolled down',this.page)
        this.ribbonShow = true
      }else{
      this.ribbonShow = false
      }

    }

}
