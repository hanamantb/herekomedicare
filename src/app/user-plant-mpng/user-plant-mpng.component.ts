import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {ErrorDisplayService} from '../services/error-service.service';
import {MatDialog} from '@angular/material/dialog';
import {SpinnerService} from '../services/spinner.service';
import {CommonService} from '../services/common.service';
import {Subject} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AppConstants} from '../helpers/AppConstants';

@Component({
  selector: 'app-user-plant-mpng',
  templateUrl: './user-plant-mpng.component.html',
  styleUrls: ['./user-plant-mpng.component.css']
})
export class UserPlantMpngComponent implements OnInit {
  myControl = new FormControl();
  editform: FormGroup = new FormGroup({
    user : new FormControl(),
    plant : new FormControl()
  })
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: any[] = [];

  @ViewChild('rejectWarning', {static: true}) rejectWarning!: TemplateRef<any>;
  @ViewChild('addnew', {static: true}) addnew!: TemplateRef<any>;



  private ngUnsubscribe = new Subject();
  username = '';
  department = '';
  userid: any;
  plants: any[] = [];
  filtrplants: any[] = [];
  plantname: any;
  addvisible = false;
  mappedusrs: any[] = []
  filtrmappedusrs: any[] = []
  colDef4 = function () {
    return '<img src="assets/goto.png" height="24" width="22" style=" margin-top: 5px; margin-left: 25px;text-align: center"/>';
  };
  colDef5 = function () {
    return '<img src="assets/delete.png" height="24" width="22" style=" margin-top: 5px; margin-left: 5px"/>';
  };
  columnDefs = [
    {field: 'index', headerName: '#', width: 150},
    {field: 'usrname', headerName: 'User Name', filter: 'agTextColumnFilter', width: 250},
    {field: 'plantcount', headerName: 'Plant count', filter: 'agTextColumnFilter', width: 200},
    {field: 'more', headerName: 'Details', filter: 'agTextColumnFilter', width: 150, cellRenderer: this.colDef4},
  ];
  columnDefsdet = [
    {field: 'index', headerName: '#', width: 100},
    {field: 'plntname', headerName: 'Plant Name', filter: false, width: 250},
    {field: 'more', headerName: 'Delete', filter: true, width: 150, cellRenderer: this.colDef5},
    ,
  ];

  rowData = [];
  plantdata = [];


  constructor(private route: Router,
              private dialog: MatDialog,
              private errorService: ErrorDisplayService,
              private spinnerService: SpinnerService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.getUsersPlants();
    this.getallplants();
    this.getallmappedUsers();
  }

  filter(event: any): void {
    console.log(event.target.value);
    const searchkey = event.target.value.toLowerCase();
    this.filteredOptions = this.plants.filter((value: any, index, array) => {
      return value.department_name.toLowerCase().includes(searchkey);
    });
    console.log('after search', this.filteredOptions)

  }

  _displayplantname(plant: any) {
    if (plant && plant.department_name) {
      console.log(plant.department_id);
      this.plantname = plant.department_id;
      return plant.department_name;
    }
    return '';
  }

  onGridCellClicked(event: any): void {
    const userid = event.data.userid;
    console.log(userid);
    this.username = event.data.usrname;
    this.department = event.data.department;
    this.userid = userid;
    if (event.colDef.field === 'more') {
      this.getplantdetails(userid);
      this.dialog.open(this.rejectWarning, {width: '900px'});
    }
  }

  addusr(){
    this.dialog.open(this.addnew, {width: '600px'});
  }

  getUsersPlants(): void {
    const spinner = this.spinnerService.start();
    this.commonService.getUsersPlants()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
          } else {
            this.rowData = response.data;
            console.log(response.data)
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  getplantdetails(userid: any): void {
    const spinner = this.spinnerService.start();
    this.commonService.getplantdetails(userid)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
          } else {
            this.plantdata = response.data;

            console.log(response.data)
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  delete(event: any): void {
    console.log(event.data);
    const plntid = event.data.plantId
    console.log(this.userid);
    const spinner = this.spinnerService.start();
    this.commonService.deletemaping(this.userid, plntid)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
          } else {
            this.plantdata = response.data;
            console.log(response.data);
            this.errorService.showSuccess(response.retMsg);
            this.getplantdetails(this.userid);
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  getallplants(): void {
    this.commonService.getallplants()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          console.log('allplants', response.data);
          this.plants = response.data;
          this.filtrplants = response.data;
          this.filteredOptions = response.data;
        },
        (_: any) => {
          console.log('error')
        },
      );
  }

  getallmappedUsers(): void {
    this.commonService.cpxMappedUsers()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          console.log('mappedusrs', response.data);
          this.mappedusrs = response.data;
          this.filtrmappedusrs = response.data;
        },
        (_: any) => {
          console.log('error')
        },
      );
  }


  add() {
    if (this.plantname === null || this.plantname === '') {
      this.errorService.showError(0, 'Invalid Action!', 'No plants selected!');
    } else {
      this.plantname = this.myControl.value.department_id;
      this.plantMapingToUser(this.plantname);
    }

  }

  plantMapingToUser(plntid: any): void {
    console.log(this.userid);
    const spinner = this.spinnerService.start();
    this.commonService.plantMapingToUser(this.userid, plntid)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
          } else {
            this.plantdata = response.data;
            console.log(response.data)
            this.errorService.showSuccess(response.retMsg);
            this.getplantdetails(this.userid);
            this.visible();
            this.plants = [] ;
            this.myControl.patchValue(
              {
                plant:''
              }
            )
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
  }

  visible() {
    this.addvisible = !this.addvisible
  }

  appNewUsrMping(){
const plnt = this.editform.value.plant
    const usr = this.editform.value.user
    console.log(this.userid);
    const spinner = this.spinnerService.start();
    this.commonService.addNewUserPlant(usr, plnt)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (response) => {
          if (response.retVal !== 0) {
            this.errorService.showError(response.retMsg)
          } else {
            this.plantdata = response.data;
            console.log(response.data)
            this.errorService.showSuccess('Succesfully Added');
            this.getUsersPlants();
            this.visible();
            this.editform.reset()
            this.plants = [] ;
          }
          this.spinnerService.stop(spinner);
        },
        (_: any) => {
          this.spinnerService.stop(spinner);
        },
      );
    console.log(plnt,usr)
  }

  onKeyplant(event: any): void {
    this.plants = this.filtrplants;
    const keyword = event.target.value.toLowerCase();
    const datalist = this.plants.filter(data => data.department_name.toLowerCase().includes(keyword));
    this.plants = datalist;
  }

  onKeyuser(event: any): void {
    this.mappedusrs = this.filtrmappedusrs;
    const keyword = event.target.value.toLowerCase();
    const datalist = this.mappedusrs.filter(data => data.username.toLowerCase().includes(keyword));
    this.mappedusrs = datalist;
  }

}
