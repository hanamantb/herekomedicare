// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private numberSubject = new Subject<number>();
  number$ = this.numberSubject.asObservable();

  incrementNumber() {
    this.numberSubject.next(1);
  }
}
