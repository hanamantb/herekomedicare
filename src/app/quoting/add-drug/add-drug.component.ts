import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GridApi} from "ag-grid-community";
import {BrowseDrugComponent} from "./browse-drug/browse-drug.component";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-add-drug',
  templateUrl: './add-drug.component.html',
  styleUrls: ['./add-drug.component.css']
})
export class AddDrugComponent implements OnInit {
  @ViewChild('generic', {static: true}) generic!: TemplateRef<any>;
  rowData: any = [];
  alphabets: string[] = [];
  items = [];
  drugForm!: FormGroup;
  gridapi?: GridApi;
  drugname = new FormControl()
  selectedItem: any;
  itemName = ''
  item: any;
  rxcui: any;
  drugs: any = [  ];
  dosagesDetails: any = [];
  dosages: any = [];
  packages: any = [];

  constructor(private route: Router, public dialog: MatDialog,
              private offcanvasService: NgbOffcanvas,
              public fb: FormBuilder,
              private commonservice: CommonService) {
    const startChar = 'A'.charCodeAt(0);
    const endChar = 'Z'.charCodeAt(0);

    for (let i = startChar; i <= endChar; i++) {
      this.alphabets.push(String.fromCharCode(i));
    }
    this.drugForm = this.fb.group({
      drugName: [null, [Validators.required]],
      dosage: [null, [Validators.required]],
      package: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      frequency: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  colDef5 = function () {
    return '<img src="assets/edit.png" height="32" />';
  };

  columnDefs = [
    {
      field: 'index', headerName: '#', width: 80,
      valueGetter: (node: any) => String(node.node.rowIndex + 1)
    },
    {field: 'drugName', headerName: 'Drug Name', filter: true, width: 150, flex: 1},
    {field: 'dosage', headerName: 'Dosage', filter: true, width: 100},
    {field: 'package', headerName: 'Package', filter: true, width: 200},
    {field: 'quantity', headerName: 'Quantity', filter: true, width: 100},
    {field: 'frequency', headerName: 'Frequency', filter: true, width: 150},
    {
      headerName: 'Actions',
      cellRenderer: this.colDef5, width: 100
    },
  ];

  addPharmacy() {
    this.dialog.closeAll()
    this.route.navigate(['add-pharmacy'])
  }

  open() {
    const dataDialog = this.dialog.open(BrowseDrugComponent, {
      width: '600px',
      position: {right: '0'}
    });
    dataDialog.afterClosed().subscribe(ret => {
      this.selectedItem = [];
      this.packages = [];
      console.log('retData', ret)
      this.item=ret
      this.itemName = ret.name
      this.rxcui = ret.rxcui
        if (!ret.is_generic) {
          this.dialog.open(this.generic, {width: '600px'})
        }
      this.getDosageDetails()
    })
  }

  toggleItemSelection(item: any) {

    this.selectedItem = item
    this.itemName = item.name
    console.log(item.name)
  }

  navPlans() {
    this.route.navigate(['Plans'])
    this.dialog.closeAll()
  }

  addDrug() {
    console.log('drgggg', this.drugForm.value)
    let pack = this.drugForm.value.package
    if (pack === null) {
      pack = 'NA'
    }else{
      pack = this.drugForm.value.package.package_description
    }
    this.drugForm.patchValue({
      drugName: this.itemName,
      package: pack
    })
    this.rowData.push(this.drugForm.value)
    this.gridapi?.setRowData(this.rowData)
    this.itemName = ''
    this.drugForm.reset()
    this.drugname.reset()

  }

  onGridReady(params: any): void {
    this.gridapi = params.api;
  }


  getDrugs(event: any) {
    console.log(event)
    this.commonservice.searchDrug(event.target.value).subscribe((response) => {
      this.drugs = response.data.drugs
      console.log(response)
    })
  }

  _displayplantname(drug: any) {
    if (drug) {
      return drug.name
    }
    return '';
  }

  change(event: any) {
    console.log(event.option.value)
    this.item = event.option.value
    this.rxcui = event.option.value.rxcui
    if (!this.item.is_generic) {
      this.dialog.open(this.generic, {width: '600px'})
    }
    this.selectedItem = [];
    this.packages = '';
    this.itemName = event.option.value.name
    this.getDosageDetails()
  }

  rxcuichange(event: any) {
    console.log('rxcui', event)
    this.rxcui = event
  }

  getDosageDetails() {
    this.commonservice.drugDosage("2623").subscribe((response) => {
      console.log('getDosageDetails', response)
      this.dosagesDetails = response.data
      const distinctValues = Array.from(new Set(this.dosagesDetails.map((item: any) => item)));
      this.dosages = distinctValues;

      this.drugForm.patchValue({
        dosage: this.dosages[0].dosage_form,
        quantity: Number(this.dosages[0].default_quantity
        )
      })
      console.log('distinctValues', distinctValues)
    })

  }

  dosageChange(event: any) {
    this.packages = []
    const filteredData = this.dosagesDetails.filter((item: any) => item.dosage_form === event.value);
    const pack = Array.from(new Set(filteredData.map((item: any) => item)));
    pack.forEach((element: any) => {
      if (element.package_description != "") {
        this.packages.push(element)
      }
    })
    this.drugForm.patchValue({
      package: this.packages[0],
      quantity: Number(this.packages[0].default_quantity)
    })

  }

  packageChange(event: any) {
    console.log('event.value---', event.value)
    this.drugForm.patchValue({
      quantity: Number(event.value.default_quantity
      )
    })

  }

  cancel() {
    this.dialog.closeAll()
    this.getDosageDetails()
  }
}
