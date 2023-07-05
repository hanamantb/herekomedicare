import {Component, OnInit, Output} from '@angular/core';
import EventEmitter = NodeJS.EventEmitter;
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-prescription-drugs',
  templateUrl: './prescription-drugs.component.html',
  styleUrls: ['./prescription-drugs.component.css']
})
export class PrescriptionDrugsComponent implements OnInit {
  showmore: boolean = false
  benefits: boolean = false
  optnpkShow: boolean = false
  isChecked:boolean =false
  checkedData:any=[];
  plans:any=[{
    "id": 3812,
    "checked": false,
    "showmore":false,
    "name": "HealthSun HealthAdvantage Plan (HMO)",
    "url": "www.HealthSun.com",
    "contract_year": "2023",
    "contract_id": "H5431",
    "plan_id": "013",
    "segment_id": "0",
    "plan_type": "PLAN_TYPE_MAPD",
    "category": "PLAN_CATEGORY_HMO",
    "organization_name": "HealthSun Health Plans, Inc.",
    "annual_deductible": "$0",
    "drug_plan_deductible": 0,
    "partb_premium_reduction": 0,
    "partc_premium": 0,
    "partd_premium": 0.0,
    "annual_drugs_total": 0,
    "package_services": {
      "doctor_choice": "AVAILABILITY_PLAN_DOCTORS_MOST_SERVICES",
      "outpatient_prescription": "AVAILABILITY_PROVIDED",
      "additional_physical_exams": "AVAILABILITY_NOT_PROVIDED",
      "dental_services": "AVAILABILITY_PROVIDED",
      "vision_services": "AVAILABILITY_PROVIDED",
      "hearing_services": "AVAILABILITY_PROVIDED",
      "ms_hearing_services": true
    },
    "maximum_oopc": "$3,450 In-network",
    "primary_doctor_visit_cost": "$0 copay",
    "specialist_doctor_visit_cost": "$0 copay",
    "emergency_care_cost": "$75 copay per visit (always covered)",
    "silver_sneakers": true,
    "lis": {
      "level_100": 0.0,
      "level_75": 0.0,
      "level_50": 0.0,
      "level_25": 0.0
    },
    "overall_star_rating": {
      "category": "STAR_OVERALL_RATING",
      "rating": 5.0,
      "error": "STAR_ERROR_NO_ERROR"
    },
    "low_performing": false,
    "high_performing": true,
    "pharmacies": [
      {
        "npi": "1073617049",
        "in_network": true
      },
      {
        "npi": "1124045505",
        "in_network": true
      },
      {
        "npi": "1669593042",
        "in_network": true
      }
    ],
    "transportation": true,
    "enrollment_status": "ENROLLMENT_AVAILABLE",
    "otc_drugs": true,
    "worldwide_emergency": true,
    "telehealth": true,
    "in_home_support": true,
    "home_safety_devices": false,
    "emergency_response_device": true,
    "snp_type": "SNP_TYPE_NOT_SNP",
    "redactions": [],
    "calculated_monthly_premium": 0.0,
    "total_remaining_premium": 0.0,
    "remaining_premium_and_drugs": 0.0,
    "enrollment_opt_in_status": true,
    "remaining_premium_and_drugs_retail": 0.0,
    "remaining_premium_and_drugs_mail_order": 0.0,
    "annual_drugs_total_retail": 0,
    "annual_drugs_total_mail_order": 0,
    "msa_annual_deposit": null,
    "does_not_support_mail_order": false,
    "name_esp": "",
    "health_education": false,
    "counseling_services": false,
    "support_for_caregivers": false,
    "costs": [
      {
        "npi": "1073617049",
        "drug_costs": [
          {
            "ndc": "31722056224",
            "quantity": 4,
            "frequency": "FREQUENCY_30_DAYS",
            "full_cost": 389.008,
            "deductible_cost": 0.0,
            "initial_cost": 0.0,
            "gap_cost": 0.0,
            "catastrophic_cost": 19.45,
            "covered": true,
            "has_deductible": false,
            "coverage_reason": "COVERED",
            "default_price_used": false,
            "cost_sharing_overide": false,
            "estimated_yearly_total": 0.0
          }
        ],
        "estimated_monthly_costs": [
          {
            "date": "2023-07-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-08-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-09-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-10-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-11-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-12-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          }
        ],
        "in_network": true,
        "phase_information": {
          "deductible_amount": 0,
          "initial_coverage_start": "",
          "gap_start": "",
          "catastrophic_start": ""
        },
        "estimated_yearly_total": 0.0,
        "preferred": true,
        "mail_order": false,
        "ltc": false
      },
      {
        "npi": "1124045505",
        "drug_costs": [
          {
            "ndc": "31722056224",
            "quantity": 4,
            "frequency": "FREQUENCY_30_DAYS",
            "full_cost": 389.008,
            "deductible_cost": 0.0,
            "initial_cost": 0.0,
            "gap_cost": 0.0,
            "catastrophic_cost": 19.45,
            "covered": true,
            "has_deductible": false,
            "coverage_reason": "COVERED",
            "default_price_used": false,
            "cost_sharing_overide": false,
            "estimated_yearly_total": 0.0
          }
        ],
        "estimated_monthly_costs": [
          {
            "date": "2023-07-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-08-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-09-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-10-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-11-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-12-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          }
        ],
        "in_network": true,
        "phase_information": {
          "deductible_amount": 0,
          "initial_coverage_start": "",
          "gap_start": "",
          "catastrophic_start": ""
        },
        "estimated_yearly_total": 0.0,
        "preferred": true,
        "mail_order": false,
        "ltc": false
      },
      {
        "npi": "1669593042",
        "drug_costs": [
          {
            "ndc": "31722056224",
            "quantity": 4,
            "frequency": "FREQUENCY_30_DAYS",
            "full_cost": 353.78,
            "deductible_cost": 0.0,
            "initial_cost": 0.0,
            "gap_cost": 0.0,
            "catastrophic_cost": 17.69,
            "covered": true,
            "has_deductible": false,
            "coverage_reason": "COVERED",
            "default_price_used": false,
            "cost_sharing_overide": false,
            "estimated_yearly_total": 0.0
          }
        ],
        "estimated_monthly_costs": [
          {
            "date": "2023-07-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-08-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-09-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-10-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-11-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-12-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          }
        ],
        "in_network": true,
        "phase_information": {
          "deductible_amount": 0,
          "initial_coverage_start": "",
          "gap_start": "",
          "catastrophic_start": ""
        },
        "estimated_yearly_total": 0.0,
        "preferred": false,
        "mail_order": false,
        "ltc": false
      },
      {
        "npi": "",
        "drug_costs": [
          {
            "ndc": "31722056224",
            "quantity": 12,
            "frequency": "FREQUENCY_90_DAYS",
            "full_cost": 1165.824,
            "deductible_cost": 0.0,
            "initial_cost": 0.0,
            "gap_cost": 0.0,
            "catastrophic_cost": 58.29,
            "covered": true,
            "has_deductible": false,
            "coverage_reason": "COVERED",
            "default_price_used": false,
            "cost_sharing_overide": false,
            "estimated_yearly_total": 0.0
          }
        ],
        "estimated_monthly_costs": [
          {
            "date": "2023-07-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          },
          {
            "date": "2023-10-01",
            "deductible": 0.0,
            "initial": 0,
            "gap": 0,
            "catastrophic": 0,
            "total": 0.0
          }
        ],
        "in_network": true,
        "phase_information": {
          "deductible_amount": 0,
          "initial_coverage_start": "",
          "gap_start": "",
          "catastrophic_start": ""
        },
        "estimated_yearly_total": 0.0,
        "preferred": false,
        "mail_order": true,
        "ltc": false
      }
    ],
    "drugInfoList": {
      "ndc": "31722056224",
      "tier": 2,
      "prior_auth": false,
      "step_therapy": false,
      "quantity_limit": true,
      "on_formulary": true,
      "quantity_limit_amount": 960,
      "quantity_limit_days": 30,
      "biosimilars": []
    }
  },
    {
      "id": 3817,
      "checked": false,
      "showmore":false,
      "name": "HealthSun HealthAdvantage Plus (HMO)",
      "url": "www.HealthSun.com",
      "contract_year": "2023",
      "contract_id": "H5431",
      "plan_id": "020",
      "segment_id": "0",
      "plan_type": "PLAN_TYPE_MAPD",
      "category": "PLAN_CATEGORY_HMO",
      "organization_name": "HealthSun Health Plans, Inc.",
      "annual_deductible": "$0",
      "drug_plan_deductible": 0,
      "partb_premium_reduction": 145,
      "partc_premium": 0,
      "partd_premium": 0.0,
      "annual_drugs_total": 0,
      "package_services": {
        "doctor_choice": "AVAILABILITY_PLAN_DOCTORS_MOST_SERVICES",
        "outpatient_prescription": "AVAILABILITY_PROVIDED",
        "additional_physical_exams": "AVAILABILITY_NOT_PROVIDED",
        "dental_services": "AVAILABILITY_PROVIDED",
        "vision_services": "AVAILABILITY_PROVIDED",
        "hearing_services": "AVAILABILITY_PROVIDED",
        "ms_hearing_services": true
      },
      "maximum_oopc": "$3,450 In-network",
      "primary_doctor_visit_cost": "$0 copay",
      "specialist_doctor_visit_cost": "$0-15 copay per visit",
      "emergency_care_cost": "$120 copay per visit (always covered)",
      "silver_sneakers": true,
      "lis": {
        "level_100": 0.0,
        "level_75": 0.0,
        "level_50": 0.0,
        "level_25": 0.0
      },
      "overall_star_rating": {
        "category": "STAR_OVERALL_RATING",
        "rating": 5.0,
        "error": "STAR_ERROR_NO_ERROR"
      },
      "low_performing": false,
      "high_performing": true,
      "pharmacies": [
        {
          "npi": "1073617049",
          "in_network": true
        },
        {
          "npi": "1124045505",
          "in_network": true
        },
        {
          "npi": "1669593042",
          "in_network": true
        }
      ],
      "transportation": true,
      "enrollment_status": "ENROLLMENT_AVAILABLE",
      "otc_drugs": true,
      "worldwide_emergency": true,
      "telehealth": true,
      "in_home_support": false,
      "home_safety_devices": false,
      "emergency_response_device": false,
      "snp_type": "SNP_TYPE_NOT_SNP",
      "redactions": [],
      "calculated_monthly_premium": 0.0,
      "total_remaining_premium": 0.0,
      "remaining_premium_and_drugs": 0.0,
      "enrollment_opt_in_status": true,
      "remaining_premium_and_drugs_retail": 0.0,
      "remaining_premium_and_drugs_mail_order": 0.0,
      "annual_drugs_total_retail": 0,
      "annual_drugs_total_mail_order": 0,
      "msa_annual_deposit": null,
      "does_not_support_mail_order": false,
      "name_esp": "",
      "health_education": false,
      "counseling_services": false,
      "support_for_caregivers": false,
      "costs": [
        {
          "npi": "1073617049",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 389.008,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 19.45,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": true,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "1124045505",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 389.008,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 19.45,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": true,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "1669593042",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 353.78,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 17.69,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 12,
              "frequency": "FREQUENCY_90_DAYS",
              "full_cost": 1165.824,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 58.29,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": true,
          "ltc": false
        }
      ],
      "drugInfoList": {
        "ndc": "31722056224",
        "tier": 2,
        "prior_auth": false,
        "step_therapy": false,
        "quantity_limit": true,
        "on_formulary": true,
        "quantity_limit_amount": 960,
        "quantity_limit_days": 30,
        "biosimilars": []
      }
    },
    {
      "id": 973,
      "checked": false,
      "showmore":false,
      "benefits":false,
      "name": "Devoted CORE Palm Beach (HMO)",
      "url": "www.Devoted.com",
      "contract_year": "2023",
      "contract_id": "H1290",
      "plan_id": "003",
      "segment_id": "0",
      "plan_type": "PLAN_TYPE_MAPD",
      "category": "PLAN_CATEGORY_HMO",
      "organization_name": "Devoted Health",
      "annual_deductible": "$0",
      "drug_plan_deductible": 0,
      "partb_premium_reduction": 0,
      "partc_premium": 0,
      "partd_premium": 0.0,
      "annual_drugs_total": 0,
      "package_services": {
        "doctor_choice": "AVAILABILITY_PLAN_DOCTORS_MOST_SERVICES",
        "outpatient_prescription": "AVAILABILITY_PROVIDED",
        "additional_physical_exams": "AVAILABILITY_PROVIDED",
        "dental_services": "AVAILABILITY_PROVIDED",
        "vision_services": "AVAILABILITY_PROVIDED",
        "hearing_services": "AVAILABILITY_PROVIDED",
        "ms_hearing_services": true
      },
      "maximum_oopc": "$3,400 In-network",
      "primary_doctor_visit_cost": "$0 copay",
      "specialist_doctor_visit_cost": "$5 copay per visit",
      "emergency_care_cost": "$120 copay per visit (always covered)",
      "silver_sneakers": true,
      "lis": {
        "level_100": 0.0,
        "level_75": 0.0,
        "level_50": 0.0,
        "level_25": 0.0
      },
      "overall_star_rating": {
        "category": "STAR_OVERALL_RATING",
        "rating": 4.5,
        "error": "STAR_ERROR_NO_ERROR"
      },
      "low_performing": false,
      "high_performing": false,
      "pharmacies": [
        {
          "npi": "1073617049",
          "in_network": true
        },
        {
          "npi": "1124045505",
          "in_network": true
        },
        {
          "npi": "1669593042",
          "in_network": true
        }
      ],
      "transportation": true,
      "enrollment_status": "ENROLLMENT_AVAILABLE",
      "otc_drugs": true,
      "worldwide_emergency": true,
      "telehealth": true,
      "in_home_support": false,
      "home_safety_devices": true,
      "emergency_response_device": true,
      "snp_type": "SNP_TYPE_NOT_SNP",
      "redactions": [],
      "calculated_monthly_premium": 0.0,
      "total_remaining_premium": 0.0,
      "remaining_premium_and_drugs": 0.0,
      "enrollment_opt_in_status": true,
      "remaining_premium_and_drugs_retail": 0.0,
      "remaining_premium_and_drugs_mail_order": 0.0,
      "annual_drugs_total_retail": 0,
      "annual_drugs_total_mail_order": 0,
      "msa_annual_deposit": null,
      "does_not_support_mail_order": false,
      "name_esp": "",
      "health_education": false,
      "counseling_services": false,
      "support_for_caregivers": false,
      "costs": [
        {
          "npi": "1073617049",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 367.508,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 91.88,
              "catastrophic_cost": 18.38,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "1124045505",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 367.508,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 91.88,
              "catastrophic_cost": 18.38,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "1669593042",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 367.508,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 91.88,
              "catastrophic_cost": 18.38,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 12,
              "frequency": "FREQUENCY_90_DAYS",
              "full_cost": 1039.968,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 259.99,
              "catastrophic_cost": 52.0,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": true,
          "ltc": false
        }
      ],
      "drugInfoList": {
        "ndc": "31722056224",
        "tier": 2,
        "prior_auth": false,
        "step_therapy": false,
        "quantity_limit": false,
        "on_formulary": true,
        "quantity_limit_amount": 0,
        "quantity_limit_days": 0,
        "biosimilars": []
      }
    },
    {
      "id": 3866,
      "checked": false,
      "showmore":false,
      "benefits":false,
      "name": "Simply More (HMO)",
      "url": "shop.simplyhealthcareplans.com/medicare",
      "contract_year": "2023",
      "contract_id": "H5471",
      "plan_id": "083",
      "segment_id": "0",
      "plan_type": "PLAN_TYPE_MAPD",
      "category": "PLAN_CATEGORY_HMO",
      "organization_name": "Simply Healthcare Plans, Inc.",
      "annual_deductible": "$0",
      "drug_plan_deductible": 0,
      "partb_premium_reduction": 0,
      "partc_premium": 0,
      "partd_premium": 0.0,
      "annual_drugs_total": 0,
      "package_services": {
        "doctor_choice": "AVAILABILITY_PLAN_DOCTORS_MOST_SERVICES",
        "outpatient_prescription": "AVAILABILITY_PROVIDED",
        "additional_physical_exams": "AVAILABILITY_PROVIDED",
        "dental_services": "AVAILABILITY_PROVIDED",
        "vision_services": "AVAILABILITY_PROVIDED",
        "hearing_services": "AVAILABILITY_PROVIDED",
        "ms_hearing_services": true
      },
      "maximum_oopc": "$3,450 In-network",
      "primary_doctor_visit_cost": "$0 copay",
      "specialist_doctor_visit_cost": "$0 copay",
      "emergency_care_cost": "$75 copay per visit (always covered)",
      "silver_sneakers": true,
      "lis": {
        "level_100": 0.0,
        "level_75": 0.0,
        "level_50": 0.0,
        "level_25": 0.0
      },
      "overall_star_rating": {
        "category": "STAR_OVERALL_RATING",
        "rating": 4.5,
        "error": "STAR_ERROR_NO_ERROR"
      },
      "low_performing": false,
      "high_performing": false,
      "pharmacies": [
        {
          "npi": "1073617049",
          "in_network": true
        },
        {
          "npi": "1124045505",
          "in_network": true
        },
        {
          "npi": "1669593042",
          "in_network": true
        }
      ],
      "transportation": true,
      "enrollment_status": "ENROLLMENT_AVAILABLE",
      "otc_drugs": true,
      "worldwide_emergency": true,
      "telehealth": true,
      "in_home_support": true,
      "home_safety_devices": false,
      "emergency_response_device": true,
      "snp_type": "SNP_TYPE_NOT_SNP",
      "redactions": [],
      "calculated_monthly_premium": 0.0,
      "total_remaining_premium": 0.0,
      "remaining_premium_and_drugs": 0.0,
      "enrollment_opt_in_status": true,
      "remaining_premium_and_drugs_retail": 0.0,
      "remaining_premium_and_drugs_mail_order": 0.0,
      "annual_drugs_total_retail": 0,
      "annual_drugs_total_mail_order": 0,
      "msa_annual_deposit": null,
      "does_not_support_mail_order": false,
      "name_esp": "",
      "health_education": false,
      "counseling_services": false,
      "support_for_caregivers": false,
      "costs": [
        {
          "npi": "1073617049",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 304.34,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 15.22,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "1124045505",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 304.34,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 15.22,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "1669593042",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 304.34,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 15.22,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 12,
              "frequency": "FREQUENCY_90_DAYS",
              "full_cost": 794.88,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 39.74,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": true,
          "ltc": false
        }
      ],
      "drugInfoList": {
        "ndc": "31722056224",
        "tier": 2,
        "prior_auth": false,
        "step_therapy": false,
        "quantity_limit": true,
        "on_formulary": true,
        "quantity_limit_amount": 960,
        "quantity_limit_days": 30,
        "biosimilars": []
      }
    },
    {
      "id": 3868,
      "checked": false,
      "showmore":false,
      "benefits":false,
      "name": "Simply Level (HMO C-SNP)",
      "url": "shop.simplyhealthcareplans.com/medicare",
      "contract_year": "2023",
      "contract_id": "H5471",
      "plan_id": "085",
      "segment_id": "0",
      "plan_type": "PLAN_TYPE_MAPD",
      "category": "PLAN_CATEGORY_HMO",
      "organization_name": "Simply Healthcare Plans, Inc.",
      "annual_deductible": "$0",
      "drug_plan_deductible": 0,
      "partb_premium_reduction": 0,
      "partc_premium": 0,
      "partd_premium": 0.0,
      "annual_drugs_total": 0,
      "package_services": {
        "doctor_choice": "AVAILABILITY_PLAN_DOCTORS_MOST_SERVICES",
        "outpatient_prescription": "AVAILABILITY_PROVIDED",
        "additional_physical_exams": "AVAILABILITY_PROVIDED",
        "dental_services": "AVAILABILITY_PROVIDED",
        "vision_services": "AVAILABILITY_PROVIDED",
        "hearing_services": "AVAILABILITY_PROVIDED",
        "ms_hearing_services": true
      },
      "maximum_oopc": "$3,450 In-network",
      "primary_doctor_visit_cost": "$0 copay",
      "specialist_doctor_visit_cost": "$0 copay",
      "emergency_care_cost": "$75 copay per visit (always covered)",
      "silver_sneakers": true,
      "lis": {
        "level_100": 0.0,
        "level_75": 0.0,
        "level_50": 0.0,
        "level_25": 0.0
      },
      "overall_star_rating": {
        "category": "STAR_OVERALL_RATING",
        "rating": 4.5,
        "error": "STAR_ERROR_NO_ERROR"
      },
      "low_performing": false,
      "high_performing": false,
      "pharmacies": [
        {
          "npi": "1073617049",
          "in_network": true
        },
        {
          "npi": "1124045505",
          "in_network": true
        },
        {
          "npi": "1669593042",
          "in_network": true
        }
      ],
      "transportation": true,
      "enrollment_status": "ENROLLMENT_AVAILABLE",
      "otc_drugs": true,
      "worldwide_emergency": true,
      "telehealth": true,
      "in_home_support": true,
      "home_safety_devices": false,
      "emergency_response_device": true,
      "snp_type": "SNP_TYPE_CHRONIC_OR_DISABLING",
      "redactions": [],
      "calculated_monthly_premium": 0.0,
      "total_remaining_premium": 0.0,
      "remaining_premium_and_drugs": 0.0,
      "enrollment_opt_in_status": true,
      "remaining_premium_and_drugs_retail": 0.0,
      "remaining_premium_and_drugs_mail_order": 0.0,
      "annual_drugs_total_retail": 0,
      "annual_drugs_total_mail_order": 0,
      "msa_annual_deposit": null,
      "does_not_support_mail_order": false,
      "name_esp": "",
      "health_education": false,
      "counseling_services": false,
      "support_for_caregivers": false,
      "costs": [
        {
          "npi": "1073617049",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 304.34,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 15.22,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "1124045505",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 304.34,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 15.22,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "1669593042",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 304.34,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 15.22,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 12,
              "frequency": "FREQUENCY_90_DAYS",
              "full_cost": 794.88,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 39.74,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": true,
          "ltc": false
        }
      ],
      "drugInfoList": {
        "ndc": "31722056224",
        "tier": 2,
        "prior_auth": false,
        "step_therapy": false,
        "quantity_limit": true,
        "on_formulary": true,
        "quantity_limit_amount": 960,
        "quantity_limit_days": 30,
        "biosimilars": []
      }
    },
    {
      "id": 655,
      "checked": false,
      "showmore":false,
      "benefits":false,
      "name": "SOLIS SPF 008 (HMO)",
      "url": "https://solishealthplans.com",
      "contract_year": "2023",
      "contract_id": "H0982",
      "plan_id": "008",
      "segment_id": "0",
      "plan_type": "PLAN_TYPE_MAPD",
      "category": "PLAN_CATEGORY_HMO",
      "organization_name": "Solis Health Plans",
      "annual_deductible": "$0",
      "drug_plan_deductible": 0,
      "partb_premium_reduction": 0,
      "partc_premium": 0,
      "partd_premium": 0.0,
      "annual_drugs_total": 0,
      "package_services": {
        "doctor_choice": "AVAILABILITY_PLAN_DOCTORS_MOST_SERVICES",
        "outpatient_prescription": "AVAILABILITY_PROVIDED",
        "additional_physical_exams": "AVAILABILITY_PROVIDED",
        "dental_services": "AVAILABILITY_PROVIDED",
        "vision_services": "AVAILABILITY_PROVIDED",
        "hearing_services": "AVAILABILITY_PROVIDED",
        "ms_hearing_services": true
      },
      "maximum_oopc": "$3,400 In-network",
      "primary_doctor_visit_cost": "$0 copay",
      "specialist_doctor_visit_cost": "$5 copay per visit",
      "emergency_care_cost": "$90 copay per visit (always covered)",
      "silver_sneakers": true,
      "lis": {
        "level_100": 0.0,
        "level_75": 0.0,
        "level_50": 0.0,
        "level_25": 0.0
      },
      "overall_star_rating": {
        "category": "STAR_OVERALL_RATING",
        "rating": 3.5,
        "error": "STAR_ERROR_NO_ERROR"
      },
      "low_performing": false,
      "high_performing": false,
      "pharmacies": [
        {
          "npi": "1073617049",
          "in_network": true
        },
        {
          "npi": "1124045505",
          "in_network": true
        },
        {
          "npi": "1669593042",
          "in_network": true
        }
      ],
      "transportation": true,
      "enrollment_status": "ENROLLMENT_AVAILABLE",
      "otc_drugs": true,
      "worldwide_emergency": true,
      "telehealth": true,
      "in_home_support": false,
      "home_safety_devices": false,
      "emergency_response_device": false,
      "snp_type": "SNP_TYPE_NOT_SNP",
      "redactions": [],
      "calculated_monthly_premium": 0.0,
      "total_remaining_premium": 0.0,
      "remaining_premium_and_drugs": 0.0,
      "enrollment_opt_in_status": true,
      "remaining_premium_and_drugs_retail": 0.0,
      "remaining_premium_and_drugs_mail_order": 0.0,
      "annual_drugs_total_retail": 0,
      "annual_drugs_total_mail_order": 0,
      "msa_annual_deposit": null,
      "does_not_support_mail_order": false,
      "name_esp": "SOLIS SPF 008 (HMO)",
      "health_education": false,
      "counseling_services": false,
      "support_for_caregivers": false,
      "costs": [
        {
          "npi": "1073617049",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 624.65,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 31.23,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "1124045505",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 576.4,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 28.82,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "1669593042",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 605.2,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 30.26,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 12,
              "frequency": "FREQUENCY_90_DAYS",
              "full_cost": 1699.2,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 84.96,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": true,
          "ltc": false
        }
      ],
      "drugInfoList": {
        "ndc": "31722056224",
        "tier": 2,
        "prior_auth": false,
        "step_therapy": false,
        "quantity_limit": false,
        "on_formulary": true,
        "quantity_limit_amount": 0,
        "quantity_limit_days": 0,
        "biosimilars": []
      }
    },
    {
      "id": 745,
      "checked": false,
      "showmore":false,
      "benefits":false,
      "name": "Wellcare No Premium (HMO)",
      "url": "www.wellcare.com/medicare",
      "contract_year": "2023",
      "contract_id": "H1032",
      "plan_id": "196",
      "segment_id": "0",
      "plan_type": "PLAN_TYPE_MAPD",
      "category": "PLAN_CATEGORY_HMO",
      "organization_name": "Wellcare",
      "annual_deductible": "$0",
      "drug_plan_deductible": 0,
      "partb_premium_reduction": 0,
      "partc_premium": 0,
      "partd_premium": 0.0,
      "annual_drugs_total": 0,
      "package_services": {
        "doctor_choice": "AVAILABILITY_PLAN_DOCTORS_MOST_SERVICES",
        "outpatient_prescription": "AVAILABILITY_PROVIDED",
        "additional_physical_exams": "AVAILABILITY_PROVIDED",
        "dental_services": "AVAILABILITY_PROVIDED",
        "vision_services": "AVAILABILITY_PROVIDED",
        "hearing_services": "AVAILABILITY_PROVIDED",
        "ms_hearing_services": true
      },
      "maximum_oopc": "$1,700 In-network",
      "primary_doctor_visit_cost": "$0 copay",
      "specialist_doctor_visit_cost": "$0 copay",
      "emergency_care_cost": "$125 copay per visit (always covered)",
      "silver_sneakers": true,
      "lis": {
        "level_100": 0.0,
        "level_75": 0.0,
        "level_50": 0.0,
        "level_25": 0.0
      },
      "overall_star_rating": {
        "category": "STAR_OVERALL_RATING",
        "rating": 3.0,
        "error": "STAR_ERROR_NO_ERROR"
      },
      "low_performing": false,
      "high_performing": false,
      "pharmacies": [
        {
          "npi": "1073617049",
          "in_network": true
        },
        {
          "npi": "1124045505",
          "in_network": true
        },
        {
          "npi": "1669593042",
          "in_network": true
        }
      ],
      "transportation": true,
      "enrollment_status": "ENROLLMENT_AVAILABLE",
      "otc_drugs": true,
      "worldwide_emergency": true,
      "telehealth": true,
      "in_home_support": true,
      "home_safety_devices": false,
      "emergency_response_device": false,
      "snp_type": "SNP_TYPE_NOT_SNP",
      "redactions": [],
      "calculated_monthly_premium": 0.0,
      "total_remaining_premium": 0.0,
      "remaining_premium_and_drugs": 0.0,
      "enrollment_opt_in_status": true,
      "remaining_premium_and_drugs_retail": 0.0,
      "remaining_premium_and_drugs_mail_order": 0.0,
      "annual_drugs_total_retail": 0,
      "annual_drugs_total_mail_order": 0,
      "msa_annual_deposit": null,
      "does_not_support_mail_order": false,
      "name_esp": "",
      "health_education": false,
      "counseling_services": false,
      "support_for_caregivers": false,
      "costs": [
        {
          "npi": "1073617049",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 408.208,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 102.05,
              "catastrophic_cost": 20.41,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": true,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "1124045505",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 408.308,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 102.08,
              "catastrophic_cost": 20.42,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "1669593042",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 408.208,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 102.05,
              "catastrophic_cost": 20.41,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": true,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 12,
              "frequency": "FREQUENCY_90_DAYS",
              "full_cost": 1223.424,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 305.86,
              "catastrophic_cost": 61.17,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": true,
          "mail_order": true,
          "ltc": false
        }
      ],
      "drugInfoList": {
        "ndc": "31722056224",
        "tier": 2,
        "prior_auth": false,
        "step_therapy": false,
        "quantity_limit": false,
        "on_formulary": true,
        "quantity_limit_amount": 0,
        "quantity_limit_days": 0,
        "biosimilars": []
      }
    },
    {
      "id": 763,
      "checked": false,
      "showmore":false,
      "benefits":false,
      "name": "Wellcare Specialty No Premium (HMO C-SNP)",
      "url": "www.wellcare.com/medicare",
      "contract_year": "2023",
      "contract_id": "H1032",
      "plan_id": "224",
      "segment_id": "0",
      "plan_type": "PLAN_TYPE_MAPD",
      "category": "PLAN_CATEGORY_HMO",
      "organization_name": "Wellcare",
      "annual_deductible": "$0",
      "drug_plan_deductible": 0,
      "partb_premium_reduction": 0,
      "partc_premium": 0,
      "partd_premium": 0.0,
      "annual_drugs_total": 0,
      "package_services": {
        "doctor_choice": "AVAILABILITY_PLAN_DOCTORS_MOST_SERVICES",
        "outpatient_prescription": "AVAILABILITY_PROVIDED",
        "additional_physical_exams": "AVAILABILITY_PROVIDED",
        "dental_services": "AVAILABILITY_PROVIDED",
        "vision_services": "AVAILABILITY_PROVIDED",
        "hearing_services": "AVAILABILITY_PROVIDED",
        "ms_hearing_services": true
      },
      "maximum_oopc": "$1,700 In-network",
      "primary_doctor_visit_cost": "$0 copay",
      "specialist_doctor_visit_cost": "$0-15 copay per visit",
      "emergency_care_cost": "$125 copay per visit (always covered)",
      "silver_sneakers": true,
      "lis": {
        "level_100": 0.0,
        "level_75": 0.0,
        "level_50": 0.0,
        "level_25": 0.0
      },
      "overall_star_rating": {
        "category": "STAR_OVERALL_RATING",
        "rating": 3.0,
        "error": "STAR_ERROR_NO_ERROR"
      },
      "low_performing": false,
      "high_performing": false,
      "pharmacies": [
        {
          "npi": "1073617049",
          "in_network": true
        },
        {
          "npi": "1124045505",
          "in_network": true
        },
        {
          "npi": "1669593042",
          "in_network": true
        }
      ],
      "transportation": true,
      "enrollment_status": "ENROLLMENT_AVAILABLE",
      "otc_drugs": true,
      "worldwide_emergency": true,
      "telehealth": true,
      "in_home_support": true,
      "home_safety_devices": false,
      "emergency_response_device": false,
      "snp_type": "SNP_TYPE_CHRONIC_OR_DISABLING",
      "redactions": [],
      "calculated_monthly_premium": 0.0,
      "total_remaining_premium": 0.0,
      "remaining_premium_and_drugs": 0.0,
      "enrollment_opt_in_status": false,
      "remaining_premium_and_drugs_retail": 0.0,
      "remaining_premium_and_drugs_mail_order": 0.0,
      "annual_drugs_total_retail": 0,
      "annual_drugs_total_mail_order": 0,
      "msa_annual_deposit": null,
      "does_not_support_mail_order": false,
      "name_esp": "",
      "health_education": false,
      "counseling_services": false,
      "support_for_caregivers": false,
      "costs": [
        {
          "npi": "1073617049",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 408.208,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 20.41,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": true,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "1124045505",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 408.308,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 20.42,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": false,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "1669593042",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 4,
              "frequency": "FREQUENCY_30_DAYS",
              "full_cost": 408.208,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 20.41,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-08-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-09-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-11-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-12-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": true,
          "mail_order": false,
          "ltc": false
        },
        {
          "npi": "",
          "drug_costs": [
            {
              "ndc": "31722056224",
              "quantity": 12,
              "frequency": "FREQUENCY_90_DAYS",
              "full_cost": 1223.424,
              "deductible_cost": 0.0,
              "initial_cost": 0.0,
              "gap_cost": 0.0,
              "catastrophic_cost": 61.17,
              "covered": true,
              "has_deductible": false,
              "coverage_reason": "COVERED",
              "default_price_used": false,
              "cost_sharing_overide": false,
              "estimated_yearly_total": 0.0
            }
          ],
          "estimated_monthly_costs": [
            {
              "date": "2023-07-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            },
            {
              "date": "2023-10-01",
              "deductible": 0.0,
              "initial": 0,
              "gap": 0,
              "catastrophic": 0,
              "total": 0.0
            }
          ],
          "in_network": true,
          "phase_information": {
            "deductible_amount": 0,
            "initial_coverage_start": "",
            "gap_start": "",
            "catastrophic_start": ""
          },
          "estimated_yearly_total": 0.0,
          "preferred": true,
          "mail_order": true,
          "ltc": false
        }
      ],
      "drugInfoList": {
        "ndc": "31722056224",
        "tier": 2,
        "prior_auth": false,
        "step_therapy": false,
        "quantity_limit": false,
        "on_formulary": true,
        "quantity_limit_amount": 0,
        "quantity_limit_days": 0,
        "biosimilars": []
      }
    }];
  // @Output() menuClicked = new EventEmitter();

  constructor(private route: Router,
              private sharedService: SharedService,
              private commonservice:CommonService) {
  }

  ngOnInit(): void {
    // this.getPlans()
  }

  showMore(plan:any) {
    plan.showmore = true
  }
  showLess(plan:any) {
    plan.showmore = false
  }

  benefitShow(plan:any) {
    plan.benefits = !plan.benefits
  }

  onMenuClicked() {
    console.log('menu clicked inside toolbar');
    // this.menuClicked.emit('');
  }

  showOp() {
    this.optnpkShow=!this.optnpkShow
    console.log('cli')
  }

  cart() {
    // this.route.navigate(['cart-home'])
    this.sharedService.incrementNumber();
  }

  clear() {

  }

  getPlans(){
    const searchPlanReqBody ={
      npis: [
        1073617049,
        1124045505,
        1669593042
      ],
      prescriptions: [
        {
          ndc: "31722056224",
          frequency: "FREQUENCY_30_DAYS",
          quantity: 4
        }
      ],
      lis: "LIS_NO_HELP"
    };
    const plan_type = [
        "PLAN_TYPE_MA",
        "PLAN_TYPE_MAPD",
        "PLAN_TYPE_PDP"
      ];
    const snp_type=[
      "SNP_TYPE_NOT_SNP",
      "SNP_TYPE_CHRONIC_OR_DISABLING",
      "SNP_TYPE_DUAL_ELIGIBLE",
      "SNP_TYPE_INSTITUTIONAL"
    ]
    this.commonservice.searchPlans(searchPlanReqBody,plan_type,snp_type).subscribe((response)=>{
      this.plans = response.data.plans
      console.log('response',response)
    })
  }

  onCheckboxChange(plan:any) {
    this.checkedData.push(plan)
    console.log('checkkkk',this.checkedData.length)
    if (this.checkedData.length >= 2){
      this.isChecked = true
    }
  }
}
