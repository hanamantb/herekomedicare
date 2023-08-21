// shared.service.ts
import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private radioState:any = {
    vision: false,
    dental: false,
    hearing: false,
    transportation: false,
    silver_snekers: false,
  }


  public numberSubject = new Subject<number>();
  number$ = this.numberSubject.asObservable();
  public benefitcheck : BehaviorSubject<any> = new BehaviorSubject(true);
  benefitcheck$ = this.benefitcheck.asObservable();
  public optncheck : BehaviorSubject<any> = new BehaviorSubject(false);
  optncheck$ = this.optncheck.asObservable();
  public starRating : BehaviorSubject<any> = new BehaviorSubject('6');
  starRatings = this.starRating.asObservable();
  public carrierFilters : BehaviorSubject<any> = new BehaviorSubject('');
  carrierFilter = this.carrierFilters.asObservable();
  public planTypeFilters : BehaviorSubject<any> = new BehaviorSubject([]);
  planTypeFilter = this.planTypeFilters.asObservable();
  public snpTypeFilters : BehaviorSubject<any> = new BehaviorSubject(["SNP_TYPE_NOT_SNP"]);
  snpTypeFilter = this.snpTypeFilters.asObservable();
  public sortings : BehaviorSubject<any> = new BehaviorSubject('');
  sortBy = this.sortings.asObservable();

  radioState$ = new BehaviorSubject<any>(this.radioState);

  incrementNumber() {
    this.numberSubject.next(1);
  }
  cartCount(value:any){
    this.numberSubject.next(value)
  }

  benefitcheckchange(value:any){
    this.benefitcheck.next(value)
  }

  optncheckchange(value:any){
    this.optncheck.next(value)
  }
  starRatingchange(value:any){
    this.starRating.next(value)
  }
  carrierchange(value:any){
    this.carrierFilters.next(value)
  }
  planTypechange(value:any){
    this.planTypeFilters.next(value)
  }
  snpTypechange(value:any){
    this.snpTypeFilters.next(value)
  }
  sortingchange(value:any){
    this.sortings.next(value)
  }

  updateRadioState(variable: string) {
    for (const key in this.radioState) {
      if (key === variable) {
        this.radioState[key] = true;
      }
    }
    this.radioState$.next(this.radioState);
  }

  updateRadioStatetofalse(variable: string) {
    for (const key in this.radioState) {
      if (key === variable) {
        this.radioState[key] = false;
      }
    }
    this.radioState$.next(this.radioState);
  }
}
