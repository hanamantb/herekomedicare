import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GridApi} from "ag-grid-community";
import {BrowseDrugComponent} from "./browse-drug/browse-drug.component";
import {CommonService} from "../../services/common.service";
import {QuoteDataDetailsService} from "../../services/quote-data-details.service";
import {ActionsCellRendererComponent} from "./actions-cell-renderer/actions-cell-renderer.component";
import {AgGridAngular} from "ag-grid-angular";
import {ErrorPopupComponent} from "../../shared/layouts/error-popup/error-popup.component";

@Component({
  selector: 'app-add-drug',
  templateUrl: './add-drug.component.html',
  styleUrls: ['./add-drug.component.css']
})
export class AddDrugComponent implements OnInit {
  @ViewChild('generic', {static: true}) generic!: TemplateRef<any>;
  @ViewChild('agGrid', {static: true}) ahGrid!: AgGridAngular;
  rowData: any = [];
  apidata: any = [];
  alphabets: string[] = [];
  items = [];
  drugForm!: FormGroup;
  gridapi?: GridApi;
  drugname = new FormControl()
  selectedItem: any;
  selectedgen: any;
  itemName = ''
  item: any;
  rxcui: any;
  drugs: any = [];
  dosagesDetails: any = [];
  dosages: any = [];
  packages: any = [];
  nonEditDrug: any = [];

  columnDefs = [
    {
      field: 'index', headerName: 'Sl. No.', width: 80,
      valueGetter: (node: any) => String(node.node.rowIndex + 1)
    },
    {field: 'drugName', headerName: 'Drug Name', filter: true, width: 200, flex: 1},
    {field: 'dosage', headerName: 'Dosage', filter: true, width: 180},
    {field: 'package', headerName: 'Package', filter: true, width: 180},
    {field: 'quantity', headerName: 'Quantity', filter: true, width: 110},
    {field: 'frequency', headerName: 'Frequency', filter: true, width: 150},
    {
      headerName: 'Actions',
      field: 'actions', width: 100,
      cellRendererFramework: ActionsCellRendererComponent,
      cellRendererParams: {
        onClick: this.onActionButtonClick.bind(this),
      },
    },
  ];
  frequency = [{
    name: 'Every month',
    values: 'FREQUENCY_30_DAYS'
  },
    {
      name: 'Every 2 months',
      values: 'FREQUENCY_60_DAYS'
    },
    {
      name: 'Every 3 months',
      values: 'FREQUENCY_90_DAYS'
    },
    {
      name: 'Every 6 months',
      values: 'FREQUENCY_180_DAYS'
    },
    {
      name: 'Every 12 months',
      values: 'FREQUENCY_360_DAYS'
    }]
  effYear: any;

  constructor(private route: Router, public dialog: MatDialog,
              private offcanvasService: NgbOffcanvas,
              public fb: FormBuilder,
              private commonservice: CommonService,
              private quoteDetailsService: QuoteDataDetailsService) {
    const startChar = 'A'.charCodeAt(0);
    const endChar = 'Z'.charCodeAt(0);

    for (let i = startChar; i <= endChar; i++) {
      this.alphabets.push(String.fromCharCode(i));
    }
    this.drugForm = this.fb.group({
      rxcui: [null],
      ndc: [null],
      drugName: [null],
      dosage: [null, [Validators.required]],
      package: [null],
      quantity: [null, [Validators.required, Validators.min(0)]],
      frequency: ['Every month', [Validators.required]],
    })
  }

  get quantity() {
    return this.drugForm.get('quantity')!;
  }

  ngOnInit(): void {
    const drugs = sessionStorage.getItem('drugs')
    let drugsArray: any[] = [];
    if (drugs) {
      drugsArray = JSON.parse(drugs);
    }
    if (drugsArray.length !== 0) {
      this.rowData = drugsArray
    }
    console.log('drugsArray-length', drugsArray.length)
    console.log('drugsArray', this.rowData)
    this.effYear = sessionStorage.getItem('effectyear')
    console.log('this.effYear',this.effYear)
  }

  colDef5 = function () {
    return '<i class="material-icons action-btns" (click)="delete($event)">delete</i>' +
      '<i class="material-icons action-btns">edit</i>';
  };

  colDef6 = function () {
    return '<i class="material-icons action-btns">edit</i>';
  };

  delete(event: any) {
    console.log('delete', event)
  }
  checkQty(input: any) {
    input.value = input.value == 0 ? '' : input.value;
  }

  addPharmacy() {
    this.dialog.closeAll()
    console.log('delete-rowData', this.rowData)
    sessionStorage.setItem('drugs', JSON.stringify(this.rowData))
    // this.updateApidrugs(this.rowData)
    // localStorage.setItem('drugs',this.rowData)
    this.quoteDetailsService.setdrug(this.rowData)
    if (this.rowData.length === 0) {
      this.route.navigate(['Plans'])
    } else {
      this.route.navigate(['add-pharmacy'])
    }

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
      this.item = ret
      this.itemName = ret.name
      this.rxcui = ret.rxcui
      console.log('ret.is_generic', ret.is_generic)
      
      if (!ret.is_generic && ret.generic != null) {
        console.log('ret.is_generic is true')
        this.dialog.open(this.generic, {width: 'auto'})
      }
      this.getDosageDetails()
    })
  }

  toggleItemSelection(item: any) {
    this.selectedItem = item
    this.itemName = item.name
  }

  navPlans() {
    if (this.rowData.length !== 0) {
      const matref = this.dialog.open(ErrorPopupComponent, {
        data: {
          buttons: true,
          customMsg: 'The plans displayed in the Plan Presentation page would not consider the drugs or the associated savings.'
        }
      })
      matref.afterClosed().subscribe((resp: any) => {
        if (resp !== undefined) {
          this.rowData = []
          this.route.navigate(['Plans'])
        }
      })
    } else {
      this.dialog.closeAll()
    }
  }


  addDrug() {
    console.log('rowData11---', this.rowData)
    let pack = this.drugForm.value.package

    const datachck = this.rowData.filter((x: any) => x.ndc === this.drugForm.value.ndc)
    console.log('pack', datachck)
    if (datachck.length !== 0) {
      this.dialog.open(ErrorPopupComponent, {data: {customMsg: 'This drug has already been added.'}, width: '600px'})
      this.nonEditDrug = []
      this.drugs = []
      this.itemName = ''
      this.drugForm.reset()
      this.drugForm.patchValue({
        frequency: "Every month"
      })
      this.drugname.reset()
    }else if(this.packages.length !==0 && this.drugForm.value.package === null){
      this.dialog.open(ErrorPopupComponent, {data: {customMsg: 'Please select a package.'}, width: '600px'})

    } else if (this.drugForm.valid) {

      if (pack === null || pack === '') {
        pack = ''
      } else {
        pack = this.drugForm.value.package.package_description
      }

      let gen = ''
      if (this.nonEditDrug.length === 0) {
        if (this.item.is_generic) {
          gen = '- Generic'
        } else {
          gen = '- Brand'
        }
      }
      this.drugForm.patchValue({
        rxcui: this.rxcui,
        drugName: this.itemName + ' ' + gen,
        package: pack,
        dosage: this.drugForm.value.dosage.strength + ' ' + this.drugForm.value.dosage.dosage_form,
        ndc: this.drugForm.value.dosage.ndc
      })
      this.rowData.push(this.drugForm.value)
      this.gridapi?.setRowData(this.rowData)
      this.nonEditDrug = []
      this.drugs = []
      this.itemName = ''
      this.drugForm.reset()
      this.drugForm.patchValue({
        frequency: "Every month"
      })
      this.drugname.reset()
    } else {
      this.dialog.open(ErrorPopupComponent, {data: {customMsg: 'Quantity or Frequency is not valid.'}, width: '600px'})
    }
    console.log('rowData222---', this.rowData)
  }

  cancelDrug() {
    console.log('nonEditDrug', this.nonEditDrug)
    if (this.nonEditDrug.length !== 0) {
      this.rowData.push(this.nonEditDrug)
      this.gridapi?.setRowData(this.rowData)
      this.nonEditDrug = []
    }
    this.itemName = ''
    this.drugForm.reset()
    this.drugname.reset()
  }

  onGridReady(params: any): void {
    this.gridapi = params.api;
  }


  getDrugs(event: any) {
    console.log(event)
    this.commonservice.searchDrug(event.target.value,this.effYear).subscribe((response) => {
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
    console.log('druggg', event.option.value)
    this.item = event.option.value
    this.rxcui = event.option.value.rxcui
    if (!this.item.is_generic && this.item.generic != null) {
      const dataDialog = this.dialog.open(this.generic, {width: '600px'})
      dataDialog.afterClosed().subscribe(ret => {
        this.getDosageDetails()
      })
    } else {
      this.getDosageDetails()
    }
    this.selectedItem = [];
    this.packages = '';
    this.itemName = event.option.value.name

  }

  rxcuichange(event: any) {
    console.log('rxcuichange', event)
    this.itemName = event.name
    this.rxcui = event.rxcui
  }

  getDosageDetails() {
    this.drugForm.patchValue({
      frequency: "Every month"
    })
    this.commonservice.drugDosage(this.rxcui,this.effYear).subscribe((response) => {
      this.dosagesDetails = response.data
      console.log('getDosageDetails', response)
      const distinctValues = Array.from(new Set(this.dosagesDetails.map((item: any) => item)));
      this.dosages = distinctValues;
      if (this.nonEditDrug.length === 0) {
        if (this.dosages[0].package_description !=''){
          this.packages = this.dosages
        }
        console.log('test',this.dosages[0])
        const quantityDefault = Number(this.dosages[0].default_quantity,);
        const defaultQtyEmpty = quantityDefault == 0 ? '' : quantityDefault;
        this.drugForm.patchValue({
          ndc: this.dosages[0].ndc,
          dosage: this.dosages[0],
          quantity: defaultQtyEmpty,
        })
        
      } else {
        const editndc = this.dosagesDetails.filter((item: any) => item.ndc === this.nonEditDrug.ndc)
        console.log('editndc', editndc)
        this.drugForm.patchValue({
            dosage: editndc[0],
            package: editndc[0],
          }
        )
        this.packages.push(editndc[0])
      }
      console.log('distinctValues', distinctValues)
    })

  }

  dosageChange(event: any) {
    this.packages = []
    console.log('event', event)
    const filteredData = this.dosagesDetails.filter((item: any) => item.dosage_form === event.value.dosage_form);
    const pack = Array.from(new Set(filteredData.map((item: any) => item)));
    pack.forEach((element: any) => {
      console.log('dosageChange', element)
      if (element.package_description != "") {
        this.packages.push(element)
      }
    })
    console.log('dos pack', pack)
    console.log('dos packages', this.packages)
    console.log('dos event  package_description\n', event.value)
    const quantityDefault = Number(event.value.default_quantity);
    const defaultQtyEmpty = quantityDefault == 0 ? '' : quantityDefault;
    this.drugForm.patchValue({
      ndc: event.value.ndc,
      package: event.value,
      quantity: defaultQtyEmpty
    })

  }

  packageChange(event: any) {
    console.log('event.value---', event.value)
    this.drugForm.patchValue({
      ndc: event.value.ndc,
      quantity: Number(event.value.default_quantity)
    })
  }

  cancel() {
    this.dialog.closeAll()
    this.getDosageDetails()
  }

  close() {
    this.itemName = ''
    this.drugForm.reset()
    this.drugname.reset()
    this.dialog.closeAll()
  }

  onActionButtonClick(action: any, data: any): void {
    // Handle button click event here
    console.log('Button clicked:', data);
    if (action === 'delete') {
      this.rowData.forEach((element: any, index: any) => {
        if (data.drugName === element.drugName) {
          this.rowData.splice(index, 1)
          this.gridapi?.setRowData(this.rowData)
        }
      })
    } else if (action === 'edit') {
      this.itemName = data.drugName
      this.rxcui = data.rxcui
      this.getDosageDetails()
      this.drugForm.patchValue({
        ndc: data.ndc,
        drugName: data.drugName,
        dosage: data.dosage,
        package: data.package,
        quantity: data.quantity,
        frequency: data.frequency,
      })

      this.rowData.forEach((element: any, index: any) => {
        console.log(element)
        if (data.drugName == element.drugName) {
          this.nonEditDrug = element
          this.rowData.splice(index, 1)
          this.gridapi?.setRowData(this.rowData)
        }
      })
    }
  }


  onGridCellClicked(event: any): void {
    console.log(event.data)
  }

  getRowHeight(params: any) {
    // Calculate the row height based on the content size
    const lineHeight = 20; // Average line height in pixels
    const lines = (params.data.drugName || '').split('\n').length; // Count lines in description
    return 70 + lines * lineHeight; // Base height + additional height for lines
  }
}
