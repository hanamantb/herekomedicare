import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {
  // private REST_API_SERVER = environment.baseUrl;

  constructor(private http: HttpClient, private cookie: CookieService) {
  }

  private static cleanObject(obj: any): any {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj;
  }

  private static removeBranchCode(obj: any): any {
    delete obj.branch_codes;
    return obj;
  }


  public post(apiUrl: string, data: any): Observable<any> {
    data = ApiProviderService.cleanObject(data);
    console.log('REQUEST BODY for API :', apiUrl, data);
    return this.http.post(apiUrl, data);
  }

  public get(apiUrl: string): Observable<any> {
    return this.http.get(apiUrl);
  }

  // public simpleGet(apiUrl: string): Observable<any> {
  //   return this.http.get(apiUrl);
  // }

  /**
   * delete
   * generic method for making delete requests to the server
   */
  public delete(apiUrl: string, data: any): Observable<any> {
    data = ApiProviderService.cleanObject(data);
    console.log('REQUEST BODY for API :', apiUrl, data);
    return this.http.request('delete', apiUrl, {body: data});
  }

  /**
   * put
   * generic method for making put requests to the server
   */
  public put(apiUrl: string, data: any): Observable<any> {
    data = ApiProviderService.cleanObject(data);
    console.log('REQUEST BODY for API :', apiUrl, data);
    return this.http.put(apiUrl, data);
  }


}
