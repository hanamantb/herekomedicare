import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlConstants} from '../helpers/UrlConstants';
import {Observable} from 'rxjs';
import {ApiProviderService} from './api-provider.service';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient,
              private apiProvider: ApiProviderService) {
  }

  public getAllCategories(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllCategoriesFromMaster,
      {}
    );
  }

  public getAllPlants(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllPlants,
      {}
    );
  }

  public getAllInvstmntPurpose(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllInvstmntPurpose,
      {}
    );
  }

  public getAllInvstmntType(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllInvstmntType,
      {}
    );
  }

  public getDashboardDataRequester(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getDashboardDataRequester,
      {}
    );
  }


  public getDashboardDataOthers(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getDashboardDataOthers,
      {}
    );
  }

  public getDashboardDataAdmin(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getDashboardDataAdmin,
      {}
    );
  }

  public getDashboardDataSuperadmin(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getDashboardDataSuperadmin,
      {}
    );
  }

  public getAllUploadedErrorMsgs(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllUploadedErrorMsgs,
      {}
    );
  }

  public getTempBudgetUploads(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getTempBudgetUploads,
      {}
    );
  }

  public getRequestedDetails(role: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.getRequestedDetails,
      {role}
    );
  }

  public getAllPendingRequests(financialYear: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllPendingRequests,
      {financialYear}
    );
  }

  public getAllRejectedRequests(financialYear: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllRejectedRequests,
      {financialYear}
    );
  }

  public getAllApprovedRequests(financialYear: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllApprovedRequests,
      {financialYear}
    );
  }

  public getAllResubmittedRequests(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllResubmittedRequests,
      {}
    );
  }

  public doSendBudgetPlanForApproval(selectedRequests: number[]): Observable<any> {
    return this.apiProvider.post(UrlConstants.doSendBudgetPlanForApproval,
      {selectedRequests}
    );
  }

  public clearBudgetUpload(selectedRequests: number[]): Observable<any> {
    return this.apiProvider.post(UrlConstants.clearBudgetUpload,
      {selectedRequests}
    );
  }

  public getCommonDetailsOfRequest(requestId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.getCommonDetailsOfRequest,
      {requestId}
    );
  }

  public getAllCommonDocuments(requestId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllCommonDocuments,
      {requestId}
    );
  }

  public approvalForDeptHead(requestId: number, remarks: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.approvalForDeptHead,
      {
        requestId,
        remarks
      }
    );
  }

  public mutlipleApprovalForDeptHead(selectedRequests: number[], remarks: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.mutlipleApprovalForDeptHead,
      {
        selectedRequests,
        remarks
      }
    );
  }

  public mutilpleApproveByHo(selectedRequests: number[], remarks: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.mutilpleApproveByHo,
      {
        selectedRequests,
        remarks
      }
    );
  }

  public multipleRejection(selectedRequests: number[], rejectReson: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.multipleRejection,
      {
        selectedRequests,
        rejectReson
      }
    );
  }

  public resubmitRequest(requestId: number, remarks: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.resubmitRequest,
      {requestId, remarks}
    );
  }

  public approvalByHo(requestId: number, remarks: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.approvalByHo,
      {requestId, remarks}
    );
  }

  public rejection(requestId: number, rejectReson: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.rejection,
      {requestId, rejectReson}
    );
  }

  public historyOfRequest(requestId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.historyOfRequest,
      {requestId}
    );
  }

  public getCurrentStage(requestId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.getCurrentStage,
      {requestId}
    );
  }

  public updateQtys(requestId: number, qty: number, approxVal: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.updateQtys,
      {
        requestId,
        qty,
        approxVal
      }
    );
  }

  public deleteDocument(docId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.deleteDocument,
      {docId}
    );
  }

  public downloadDocument(docId: number, phase: number): Observable<any> {
    return this.http.post(UrlConstants.downloadDocument, {docId, phase}, {responseType: 'blob'});
  }

  public updateBudgetRequest(requstId: number, plantId: number, catgryId: number, typeId: number, purposeId: number, qty: number, appxVal: number, payBack: string, payBackPeriod: string, remarks: string,): Observable<any> {
    return this.apiProvider.post(UrlConstants.updateBudgetRequest,
      {requstId, plantId, catgryId, typeId, purposeId, qty, appxVal, payBack, payBackPeriod, remarks}
    );
  }

  public getBudgetTemplate(): Observable<any> {
    return this.http.post(UrlConstants.getBudgetTemplate, {}, {responseType: 'blob'});
  }


  public dwnldfilteredrequest(selectedRequests: any): Observable<any> {
    return this.http.post(UrlConstants.dwnldfilteredrequest, {selectedRequests}, {responseType: 'blob'}
    );
  }

  public downloadIOrders(iOrdersIds: any): Observable<any> {
    return this.http.post(UrlConstants.downloadIOrders, {iOrdersIds}, {responseType: 'blob'}
    );
  }

  public downloadCapexData(selectedRequests: any): Observable<any> {
    return this.http.post(UrlConstants.downloadCapexData, {selectedRequests}, {responseType: 'blob'}
    );
  }


  public getAllBudgetApprovals(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllBudgetApprovals,
      {}
    );
  }

  public getAutoGeneratedBudgetNo(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAutoGeneratedBudgetNo,
      {}
    );
  }

  public getAllBudgetIds(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllBudgetIds,
      {}
    );
  }

  public getDetailesOfSelectedRequests(requestIds: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.getDetailesOfSelectedRequests,
      {requestIds}
    );
  }

  public saveBudgetAmount(requestId: number, amount: number, approvalId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.saveBudgetAmount,
      {
        requestId,
        amount, approvalId
      }
    );
  }

  public saveBudgetAmountcross(requestId: number, amount: number, approvalId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.saveBudgetAmountcross,
      {
        requestId,
        amount, approvalId
      }
    );
  }


  public submitBudgetApproval(budgetCd: string, budgetDesc: string, budgetAmount: number, requestIds: any, contigious: boolean, localsaved: any, investmentid: any, plantId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.submitBudgetApproval,
      {budgetCd, budgetDesc, budgetAmount, requestIds, contigious, localsaved, investmentid, plantId}
    );
  }

  public getCommonDetailsOfBudget(approvalId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.getCommonDetailsOfBudget,
      {approvalId}
    );
  }

  public getBudgetRequestDetails(approvalId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.getBudgetRequestDetails,
      {approvalId}
    );
  }

  public getRequestDetailsHistory(requestId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.getRequestDetailsHistory,
      {requestId});
  }

  public getAllApprovalDocument(approvalId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllApprovalDocument,
      {approvalId}
    );
  }

  public getAllInactiveApprovalDocument(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllInactiveApprovalDocument,
      {}
    );
  }

  public getAllInactivePaybackApprovalDocument(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllInactivePaybackApprovalDocument,
      {}
    );
  }

  public deleteApprovalDocument(docId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.deleteApprovalDocument,
      {docId}
    );
  }

  public deletePaybackInactiveApprovalDocument(docId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.deletePaybackInactiveApprovalDocument,
      {docId}
    );
  }

  public deleteInactiveApprovalDocument(docId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.deleteInactiveApprovalDocument,
      {docId}
    );
  }

  public approveBudgetToNxtLevel(approvalId: number, apprvRemarks: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.approveBudgetToNxtLevel,
      {approvalId, apprvRemarks}
    );
  }

  public rejectBudget(approvalId: number, rejectReson: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.rejectBudget,
      {
        approvalId,
        rejectReson
      }
    );
  }

  public getAllCapexRequests(financialYear: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllCapexRequests,
      {financialYear}
    );
  }

  public capexApprovedBudgets(financialYear: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.capexApprovedBudgets,
      {financialYear}
    );
  }

  public getRejectedCapexRequests(financialYear: string): Observable<any> {
    return this.apiProvider.post(UrlConstants.getRejectedCapexRequests,
      {financialYear}
    );
  }

  public historyOfBudget(approvalId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.historyOfBudget,
      {approvalId}
    );
  }

  public savecrossutilisation(approvalId: number, requestId: number, budgetAmount: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.savecrossutilisation,
      {approvalId, requestId, budgetAmount}
    );
  }

  public budgetCheck(approvalId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.budgetCheck,
      {approvalId}
    );
  }

  public mailToCrossUtilisation(approvalId: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.mailToCrossUtilisation,
      {approvalId}
    );
  }

  public saverequestids
  (approvalId: number, requestIds: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.saverequestids,

      {approvalId, requestIds}
    );
  }

  public getDashboardCpxReqstr(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getDashboardCpxReqstr,
      {}
    );
  }

  public getInvalidBudgets(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getInvalidBudgets,
      {}
    );
  }

  public getcapexCurrentStage(approvalId: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.getcapexCurrentStage,
      {approvalId}
    );
  }

  public removeRequestId(requestId: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.removeRequestId,
      {requestId}
    );
  }

  public deletenullapprovals(): Observable<any> {
    return this.apiProvider.post(UrlConstants.deletenullapprovals,
      {}
    );
  }

  public getuserplants(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getuserplants,
      {}
    );
  }

  public getAllPlantsApprovd(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllPlantsApprovd,
      {}
    );
  }

  public getAllUserPlants(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllUserPlants,
      {}
    );
  }


  public getallinvestmenttypes(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getallinvestmenttypes,
      {}
    );
  }

  public getSuperPushRequestedDetails(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getSuperPushRequestedDetails,
      {}
    );
  }


  public pushToHo(selectedRequests: number[]): Observable<any> {
    return this.apiProvider.post(UrlConstants.pushToHo,
      {
        selectedRequests

      }
    );
  }

  public getUsersPlants(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getUsersPlants,
      {}
    );
  }

  public getplantdetails(userid: number[]): Observable<any> {
    return this.apiProvider.post(UrlConstants.getplantdetails,
      {
        userid

      }
    );
  }

  public deletemaping(userid: number, plantid: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.deletemaping,
      {
        userid, plantid

      }
    );
  }

  public getallplants(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getallplants,
      {}
    );
  }

  public cpxMappedUsers(): Observable<any> {
    return this.apiProvider.post(UrlConstants.cpxMappedUsers,
      {}
    );
  }

  public plantMapingToUser(userid: number, plantid: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.plantMapingToUser,
      {
        userid, plantid

      }
    );
  }

  public addNewUserPlant(usrid: number, plantid: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.addNewUserPlant,
      {
        usrid, plantid
      }
    );
  }

  public getCfoPushRequestedDetails(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getCfoPushRequestedDetails,
      {}
    );
  }

  public getAllCpxApprovedForIO(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllCpxApprovedForIO,
      {}
    );
  }

  public capexCodeDetails(capexId: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.capexCodeDetails,
      {capexId}
    );
  }


  public pushToCfo(selectedRequests: number[]): Observable<any> {
    return this.apiProvider.post(UrlConstants.pushToCfo,
      {
        selectedRequests

      }
    );
  }

  public userSelectedBudgetIds(investmentIds: number[], plantIds: number): Observable<any> {
    return this.apiProvider.post(UrlConstants.userSelectedBudgetIds,
      {
        investmentIds,
        plantIds

      }
    );
  }

  public createIO(data: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.createIO,
      {
        data
      }
    );
  }

  public getAllPendingIOs(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllPendingIOs,
      {}
    );
  }

  public getInternalOrders(orderStatus: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.getInternalOrders,
      {orderStatus}
    );
  }

  public getAllProfitCenter(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllProfitCenter,
      {}
    );
  }

  public getAllCostCenter(): Observable<any> {
    return this.apiProvider.post(UrlConstants.getAllCostCenter,
      {}
    );
  }

  public confirmInternlOrder(orders: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.confirmInternlOrder,
      {orders}
    );
  }

  public sapPushIOrders(): Observable<any> {
    return this.apiProvider.post(UrlConstants.sapPushIOrders,
      {}
    );
  }

  public plantInvestmentFilter(plantId: any, investId: any): Observable<any> {
    return this.apiProvider.post(UrlConstants.plantInvestmentFilter,
      {plantId, investId}
    );
  }


  public reportIO(): Observable<any> {
    return this.http.post(UrlConstants.reportIO, {}, {responseType: 'blob'}
    );
  }

  public getReportBudgets(financialYear:any): Observable<any> {
    return this.apiProvider.post(UrlConstants.getReportBudgets,
      {financialYear}
    );
  }
}
