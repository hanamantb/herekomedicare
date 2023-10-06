import {Injectable} from '@angular/core';
import {ApiProviderService} from "./api-provider.service";
import {Observable} from "rxjs";
import {UrlConstants} from "../utilities/UrlConstants";
import {InjectionToken} from '@angular/core';

export const COMMON_SERVICE_TOKEN = new InjectionToken('COMMON_SERVICE_TOKEN');

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private apiProvider: ApiProviderService) {

  }

  public getCounties(zipcode: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.zipCode, {zipcode}, '');
  }

  public drugByLetter(letter: any, year: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.drugByLetter, {letter, year}, '');
  }

  public searchDrug(name: any, year: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.searchDrug, {name, year}, '');
  }

  public searchPharmacy(zipcode: any, radius_miles = "", address = "", page: any, count: any, name = ""): Observable<any> {
    return this.apiProvider.post(UrlConstants.searchPharmacy, {zipcode, radius_miles, page, count, address}, '');
  }

  public drugDosage(rxcui: any, year: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.drugDosage, {year, rxcui}, '');
  }

  public searchPlans(searchPlanReqBody: any, plan_type: any, snp_type: any, zip: any, fips: any,
    year: any,page: any, isDrugAdded = true, star_rating = '6', organization_name = '',
                     plan_category_filter = [], sort_order = "ANNUAL_TOTAL", vision_coverage = true,
                     dental_coverage = true, hearing_coverage = true, transportation = true,
                     silver_sneakers = true
  ): Observable<any> {

    let requestBody: any = {
      searchPlanReqBody, page, year, fips, sort_order, zip, isDrugAdded, plan_type
    }
    if (star_rating !== '6') {
      requestBody.star_rating = star_rating;
    }
    if (snp_type.length > 1) {
      requestBody.snp_type = snp_type;
    }
    if (organization_name !== '') {
      requestBody.organization_name = organization_name;
    }
    if (plan_category_filter.length !== 0) {
      requestBody.plan_category_filter = plan_category_filter;
    }
    if (vision_coverage) {
      requestBody.vision_coverage = vision_coverage;
    }
    if (dental_coverage) {
      requestBody.dental_coverage = dental_coverage;
    }
    if (hearing_coverage) {
      requestBody.hearing_coverage = hearing_coverage;
    }
    if (vision_coverage) {
      requestBody.transportation = transportation;
    }
    if (vision_coverage) {
      requestBody.silver_sneakers = silver_sneakers;
    }


// if (star_rating !=='6'){
//   return this.apiProvider.post(UrlConstants.searchPlans,
//     {searchPlanReqBody,plan_type,snp_type,page,year,
//       fips,sort_order,zip,isDrugAdded,vision_coverage,
//       dental_coverage,hearing_coverage,transportation,
//       silver_sneakers,organization_name,plan_category_filter},'');
// }

    return this.apiProvider.post(UrlConstants.searchPlans,
      requestBody, '');
  }

  public checkEmail(email: any): Observable<any> {
    let s = this.apiProvider.get(UrlConstants.checkEmail + email);
    console.log(s)
    return s;

  }

  public carrierName(fips: any, effectiveYear: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.carrierName, {fips, effectiveYear}, '');
  }

  public drugCost(npis: any,prescriptions: any,lis: any, year: any,planID: any,monthlypremium: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.drugCost, {npis, prescriptions,lis,year,planID,monthlypremium}, '');
  }
  public planDetails(lis: any,urlParam: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.planDetails, {lis, urlParam}, '');
  }
  // public checkEmail(email: any): Observable<any> {
  //   let s = this.apiProvider.get(UrlConstants.checkEmail + email);
  //   console.log(s)
  //   return s;

  // }
}
