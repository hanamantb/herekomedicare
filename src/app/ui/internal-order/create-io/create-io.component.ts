import {Component, OnInit} from '@angular/core';
import {map, startWith, takeUntil} from "rxjs/operators";
import {CommonService} from "../../../services/common.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorDisplayService} from "../../../services/error-service.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {GridApi, RowNode} from "ag-grid-community";
import {SpinnerService} from "../../../services/spinner.service";

@Component({
  selector: 'app-create-io',
  templateUrl: './create-io.component.html',
  styleUrls: ['./create-io.component.css']
})
export class CreateIoComponent implements OnInit {
  plants: any;
  capexCodes: any;
  investments: any;
  capexDetails: any = [];
  profitCenters: any;
  filterProfitCenters: any;
  filtercapex: any;
  filterPlants: any;
  costCenters: any;
  filtercostCenters: any;
  filteredprofits!: Observable<any[]>;
  ioForm!: FormGroup
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;


  constructor(private commonService: CommonService,
              private fb: FormBuilder,
              private errorService: ErrorDisplayService,
              private route: Router,
              private spinnerService: SpinnerService) {
    this.ioForm = this.fb.group({
      plant: [null, Validators.required],
      invstmentType: [null, Validators.required],
      capexId: [null, Validators.required],
      cpxAmount: [null, Validators.required],
      profitCenter: [null, Validators.required],
      costCenter: [null, Validators.required],
      description: [null, [Validators.required, this.validateSpecialCharacters]]
    })
  }

  ngOnInit(): void {
    this.getAllCostCenter()
    this.getuserplants()
    this.getAllCpxApprovedForIO()
    this.getallinvestmenttypes()
    this.getAllProfitCenter()

    this.filteredprofits = this.ioForm.value.profitCenter.valueChanges.subscribe(
      console.log('filteredprofits---')
    );

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  getuserplants(): void {
    this.commonService.getAllUserPlants().subscribe(
      (response) => {
        this.plants = response.data;
        this.filterPlants = response.data;
        console.log('plants---', this.plants);
      },
      (_: any) => {
        console.log('error');
      },
    );
  }

  getAllCpxApprovedForIO(): void {
    this.commonService.getAllCpxApprovedForIO().subscribe(
      (response) => {
        console.log('getallcpx--', response)
        this.capexCodes = response.data
        this.filtercapex = response.data
      },
      (_: any) => {
        console.log('error');
      },
    );
  }

  codeSelected() {
    console.log('codeSelected')
    const cpxId = this.ioForm.value.capexId
    this.commonService.capexCodeDetails(cpxId).subscribe(
      (response) => {
        console.log('getallcpx--', response)
        this.capexDetails = response.data
        this.ioForm.patchValue({
          invstmentType: Number(this.capexDetails.investment),
          plant: this.capexDetails.plant
        })
      },
      (_: any) => {
        console.log('error');
      },
    );
  }

  getallinvestmenttypes(): void {
    this.commonService.getallinvestmenttypes().subscribe(
      (response) => {
        console.log('investments', response.data);
        this.investments = response.data;
      },
      (_: any) => {
        console.log('error');
      },
    );
  }

  plantInvestmentFilter(): void {
    const investId = this.ioForm.value.invstmentType;
    const plantId = this.ioForm.value.plant;
    // this.ioForm.reset()

    this.commonService.plantInvestmentFilter(plantId, investId).subscribe(
      (response) => {
        console.log('capexCodes---', response.data);
        this.capexCodes = response.data;
        // this.ioForm.value.investments.reset()
      },
      (_: any) => {
        console.log('error');
      },
    );
  }

  submit() {

    if (!this.ioForm.valid) {
      this.errorService.showError("Please fill all the feilds")
    } else if (this.capexDetails.balanceAmt < this.ioForm.value.cpxAmount) {
      this.errorService.showError("Order amount can't be greater than capex amount")
    } else if (this.ioForm.value.cpxAmount <= 0) {
      this.errorService.showError("Order amount only accept greater than 0")
    } else {
      const spinner = this.spinnerService.start();
      const desc = this.ioForm.value.description
      const sanitizedInput = desc.trim().replace(/\n+/g, '\n');
      this.ioForm.patchValue({
        description: sanitizedInput
      })
      this.commonService.createIO(this.ioForm.value).subscribe((resp) => {
        this.errorService.showSuccess(resp.retMsg)
        this.spinnerService.stop(spinner);
        this.route.navigate(['io-dashboard'])
      })
    }
  }

  back() {
    this.route.navigate(['io-dashboard'])
  }

  getAllProfitCenter(): void {
    this.commonService.getAllProfitCenter().subscribe(
      (response) => {
        this.profitCenters = response.data;
        this.filterProfitCenters = response.data;
        console.log('profitCenters', this.profitCenters);
      },
      (_: any) => {
        console.log('error');
      },
    );
  }

  // sapPushIOrders
  getAllCostCenter(): void {
    this.commonService.getAllCostCenter().subscribe(
      (response) => {
        this.costCenters = response.data;
        this.filtercostCenters = response.data;
      },
      (_: any) => {
        console.log('error');
      },
    );
  }

  searchCostCenter(event: any) {
    this.costCenters = this.filtercostCenters
    const keyword = event.target.value.toLowerCase();
    const datalist = this.costCenters.filter((data: any) => data.costCenterdesc.toLowerCase().includes(keyword.toLowerCase()));
    this.costCenters = datalist;
  }

  searchProfyCenter(event: any) {
    this.profitCenters = this.filterProfitCenters
    const keyword = event.target.value.toLowerCase();
    const datalist = this.profitCenters.filter((data: any) => data.profitName.toLowerCase().includes(keyword.toLowerCase()));
    this.profitCenters = datalist;
  }

  cancel() {
    this.route.navigate(['io-dashboard'])
  }

  searchCapex(event: any) {
    this.capexCodes = this.filtercapex
    const keyword = event.target.value.toLowerCase();
    const datalist = this.capexCodes.filter((data: any) => data.cpxCode.toLowerCase().includes(keyword.toLowerCase()));
    this.capexCodes = datalist;
  }

  searchPlant(event: any) {
    this.plants = this.filterPlants
    const keyword = event.target.value.toLowerCase();
    const datalist = this.plants.filter((data: any) => data.plantName.toLowerCase().includes(keyword.toLowerCase()));
    this.plants = datalist;
  }

  clear() {
    this.ioForm.reset()
    this.getAllCpxApprovedForIO()
    this.capexDetails = []
  }

  onKeyPress(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    const pattern = /^[a-zA-Z0-9,.,& ]*$/;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  validateSpecialCharacters(control:any) {
    const pattern = /^[a-zA-Z0-9,.,& ]*$/; // Regular expression to match characters, full stop, comma, and space
    if (control.value && !pattern.test(control.value)) {
      return {invalidCharacters: true};
    }
    return null;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
