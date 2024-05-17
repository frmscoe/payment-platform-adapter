# PPA (Payment Platform Adapter)

### Mojaloop Quote Message

```json
{
  "quoteId": "ABC123",
  "transactionId": "asdf1234",
  "transactionRequestId": "string",
  "payee": {
    "partyIdInfo": {
      "partyIdType": "MSISDN",
      "partyIdentifier": "+27723748019",
      "partySubIdOrType": "string",
      "fspId": "bank1",
      "extensionList": {
        "extension": [
          {
            "key": "somekey",
            "value": "somevalue"
          }
        ]
      }
    },
    "merchantClassificationCode": "merchCode",
    "name": "string",
    "personalInfo": {
      "complexName": {
        "firstName": "payeefirstName",
        "middleName": "payeemiddleName",
        "lastName": "payeelastname"
      },
      "dateOfBirth": "2021-05-28"
    }
  },
  "payer": {
    "partyIdInfo": {
      "partyIdType": "MSISDN",
      "partyIdentifier": "+27723748020",
      "partySubIdOrType": "string",
      "fspId": "string",
      "extensionList": {
        "extension": [
          {
            "key": "string",
            "value": "string"
          }
        ]
      }
    },
    "merchantClassificationCode": "merchCode",
    "name": "string",
    "personalInfo": {
      "complexName": {
        "firstName": "payerfirstName",
        "middleName": "payermiddleName",
        "lastName": "payerlastname"
      },
      "dateOfBirth": "2021-05-28"
    }
  },
  "amountType": "SEND",
  "amount": {
    "currency": "USD",
    "amount": 123.45
  },
  "fees": {
    "currency": "USD",
    "amount": 12.34
  },
  "transactionType": {
    "scenario": "DEPOSIT",
    "subScenario": "string",
    "initiator": "PAYER",
    "initiatorType": "CONSUMER",
    "refundInfo": {
      "originalTransactionId": "string",
      "refundReason": "string"
    },
    "balanceOfPayments": "string"
  },
  "geoCode": {
    "latitude": "string",
    "longitude": "string"
  },
  "note": "string",
  "expiration": "string",
  "extensionList": {
    "extension": [
      {
        "key": "string",
        "value": "string"
      }
    ]
  }
}
```

---

### ISO Formatted Message

```json
{
  "GroupHeader": {
    "InitiatingParty": {
      "Name": "payerfirstName payermiddleName payerlastname",
      "Identification": {
        "Identification": "",
        "Other": {
          "Identification": "",
          "SchemeName": {
            "Proprietary": ""
          },
          "ContactDetails": {
            "MobileNumber": ""
          }
        },
        "SchemeName": {
          "Proprietary": ""
        },
        "PrivateIdentification": {
          "DateAndPlaceOfBirth": {
            "Birthdate": "2021-05-28",
            "ProvinceOfBirth": "Uknown",
            "CityOfBirth": "",
            "CountryOfBirth": "ZAR"
          },
          "Other": {
            "Identification": "",
            "SchemeName": {
              "Proprietary": "MSISDN"
            },
            "ContactDetails": {
              "MobileNumber": ""
            }
          }
        },
        "ContactDetails": {
          "MobileNumber": "+27-723748020"
        }
      }
    },
    "MessageIdentification": "de0696b9-c81d-4eb9-a7cd-6d2e306bbb64",
    "CreationDateTime": 1628751896193,
    "NumberOfTransactions": 1
  },
  "PaymentInformation": {
    "PaymentInformationIdentification": "ABC123",
    "CreditTransferTransactionInformation": {
      "PaymentIdentification": {
        "EndToEndIdentification": "asdf1234"
      },
      "CreditorAccount": {
        "Identification": {
          "Identification": "",
          "Other": {
            "Identification": "+27723748019",
            "SchemeName": {
              "Proprietary": "MSISDN"
            },
            "ContactDetails": {
              "MobileNumber": ""
            }
          },
          "SchemeName": {
            "Proprietary": ""
          },
          "PrivateIdentification": {
            "DateAndPlaceOfBirth": {
              "Birthdate": "2021-08-12",
              "ProvinceOfBirth": "Uknown",
              "CityOfBirth": "",
              "CountryOfBirth": "ZAR"
            },
            "Other": {
              "Identification": "",
              "SchemeName": {
                "Proprietary": ""
              },
              "ContactDetails": {
                "MobileNumber": ""
              }
            }
          },
          "ContactDetails": {
            "MobileNumber": "+27-723748019"
          }
        },
        "Proxy": "",
        "Name": ""
      },
      "CreditorAgent": {
        "FinancialInstitutionIdentification": {
          "ClearingSystemMemberIdentification": {
            "MemberIdentification": "bank1"
          }
        }
      },
      "Creditor": {
        "Name": "payeefirstName payeemiddleName payeelastname",
        "Identification": {
          "Identification": "",
          "Other": {
            "Identification": "",
            "SchemeName": {
              "Proprietary": "MSISDN"
            },
            "ContactDetails": {
              "MobileNumber": ""
            }
          },
          "SchemeName": {
            "Proprietary": ""
          },
          "PrivateIdentification": {
            "DateAndPlaceOfBirth": {
              "Birthdate": "2021-05-28",
              "ProvinceOfBirth": "Uknown",
              "CityOfBirth": "",
              "CountryOfBirth": "ZAR"
            },
            "Other": {
              "Identification": "",
              "SchemeName": {
                "Proprietary": ""
              },
              "ContactDetails": {
                "MobileNumber": ""
              }
            }
          },
          "ContactDetails": {
            "MobileNumber": "+27-723748019"
          }
        }
      },
      "Amount": {
        "InstructedAmount": {
          "Amount": 123.45
        },
        "EquivalentAmount": {
          "CurrencyOfTransfer": "USD",
          "Amount": 123.45
        }
      },
      "SupplementaryData": {
        "Envelope.Document.Creditor.FirstName": "payeefirstName",
        "Envelope.Document.Creditor.MiddleName": "payeemiddleName",
        "Envelope.Document.Creditor.LastName": "payeelastname",
        "Envelope.Document.Creditor.MerchantClassificationCode": "merchCode",
        "Envelope.Document.Debtor.FirstName": "payerfirstName",
        "Envelope.Document.Debtor.MiddleName": "payermiddleName",
        "Envelope.Document.Debtor.LastName": "payerlastname",
        "Envelope.Document.Debtor.MerchantClassificationCode": "merchCode",
        "fees.currency": "USD",
        "fees.amount": 12.34,
        "Envelope.Document.Expiration": "string"
      },
      "PaymentTypeInformation": {
        "CategoryPurpose": {
          "Proprietary": "DEPOSITstring"
        }
      },
      "RegulatoryReporting": {
        "Details": {
          "Code": "string",
          "Type": "BALANCE OF PAYMENTS"
        },
        "DebitCreditReportingIndicator": "BOTH"
      },
      "RemittanceInformation": {
        "Structured": {
          "AdditionalRemittanceInformation": "string"
        },
        "Unstructured": "string"
      },
      "ChargeBearer": "DEBT",
      "Purpose": {
        "Code": "MP2P"
      }
    },
    "PaymentMethod": "TRA",
    "DebtorAccount": {
      "Identification": {
        "Identification": "",
        "Other": {
          "Identification": "+27723748020",
          "SchemeName": {
            "Proprietary": "MSISDN"
          },
          "ContactDetails": {
            "MobileNumber": ""
          }
        },
        "SchemeName": {
          "Proprietary": ""
        },
        "PrivateIdentification": {
          "DateAndPlaceOfBirth": {
            "Birthdate": "2021-08-12",
            "ProvinceOfBirth": "Uknown",
            "CityOfBirth": "",
            "CountryOfBirth": "ZAR"
          },
          "Other": {
            "Identification": "",
            "SchemeName": {
              "Proprietary": ""
            },
            "ContactDetails": {
              "MobileNumber": ""
            }
          }
        },
        "ContactDetails": {
          "MobileNumber": ""
        }
      },
      "Proxy": "string",
      "Name": ""
    },
    "DebtorAgent": {
      "FinancialInstitutionIdentification": {
        "ClearingSystemMemberIdentification": {
          "MemberIdentification": "string"
        }
      }
    },
    "Debtor": {
      "Name": "payerfirstName payermiddleName payerlastname",
      "Identification": {
        "Identification": "",
        "Other": {
          "Identification": "",
          "SchemeName": {
            "Proprietary": ""
          },
          "ContactDetails": {
            "MobileNumber": ""
          }
        },
        "SchemeName": {
          "Proprietary": ""
        },
        "PrivateIdentification": {
          "DateAndPlaceOfBirth": {
            "Birthdate": "2021-05-28",
            "ProvinceOfBirth": "Uknown",
            "CityOfBirth": "",
            "CountryOfBirth": "ZAR"
          },
          "Other": {
            "Identification": "",
            "SchemeName": {
              "Proprietary": "MSISDN"
            },
            "ContactDetails": {
              "MobileNumber": ""
            }
          }
        },
        "ContactDetails": {
          "MobileNumber": "+27-723748020"
        }
      }
    },
    "RequestedAdviceType": {
      "CreditAdvice": {
        "Code": "",
        "Proprietary": ""
      },
      "DebitAdvice": {
        "Code": "ADWD",
        "Proprietary": "Advice with transaction details"
      }
    },
    "RequestedExecutionDate": {
      "Date": "2021-08-12",
      "DateTime": "2021-08-12T07:04:56.193Z"
    }
  },
  "SupplementaryData": {
    "payee.merchantClassificationCode": "merchCode",
    "payer.merchantClassificationCode": "merchCode",
    "transactionType.initiatorType": "CONSUMER",
    "geoCode.latitude": "string",
    "geoCode.longitude": "string"
  }
}
```
