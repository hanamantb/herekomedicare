// shared.service.ts
import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public numberSubject = new Subject<number>();
  number$ = this.numberSubject.asObservable();
  public benefitcheck : BehaviorSubject<any> = new BehaviorSubject(true);
  benefitcheck$ = this.benefitcheck.asObservable();
  public optncheck : BehaviorSubject<any> = new BehaviorSubject(false);
  optncheck$ = this.optncheck.asObservable();
  public starRating : BehaviorSubject<any> = new BehaviorSubject(1);
  starRating$ = this.optncheck.asObservable();

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
    this.optncheck.next(value)
  }
}
