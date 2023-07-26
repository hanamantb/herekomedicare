// shared.service.ts
import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private numberSubject = new Subject<number>();
  number$ = this.numberSubject.asObservable();
  public benefitcheck : BehaviorSubject<any> = new BehaviorSubject(true);
  benefitcheck$ = this.benefitcheck.asObservable();

  incrementNumber() {
    this.numberSubject.next(1);
  }

  benefitcheckchange(value:any){
    this.benefitcheck.next(value)
  }
}
