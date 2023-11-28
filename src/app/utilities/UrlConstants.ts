export class UrlConstants {
  public static api = "http://66.193.196.108:8080/medicare-service/v1/"

  public static zipCode = UrlConstants.api + "counties"
  public static drugByLetter = UrlConstants.api + "search_drug-by-letter"
  public static searchDrug = UrlConstants.api + "search_drug"
  public static searchPharmacy = UrlConstants.api + "pharmacy"
  public static drugDosage = UrlConstants.api + "drug-Dosage-by-rxcui"
  public static searchPlans = UrlConstants.api + "search-plans"
  public static checkEmail = UrlConstants.api + "login?username="
  public static carrierName = UrlConstants.api + "carrier-name"
  public static drugCost = UrlConstants.api + "drug-cost"
  public static planDetails = UrlConstants.api + "plan-details"
  public static processPlans = UrlConstants.api + "process-plans"
  public static planCompare = UrlConstants.api + "plan-compare"
  public static viewCustomer = UrlConstants.api + "viewCustomerList"

}
