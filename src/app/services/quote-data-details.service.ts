import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuoteDataDetailsService {
  private drug: any;
  private npis: any;
  constructor() { }

  setdrug(newData: any) {
    this.drug = newData;
  }
  getdrug() {
    return this.drug;
  }
  setnpis(newData: any) {
    this.npis = newData;
  }
  getnpis() {
    return this.npis;
  }
}
