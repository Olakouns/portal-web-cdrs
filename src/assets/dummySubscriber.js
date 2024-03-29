import {ServiceTypeEnum} from "../app/models/service-type.enum";

let data = [
  {
    "id": 1,
    "createdAt": new Date(),
    "imsi": "1212121212",
    "name": "KOUIKOUI Jean",
    "phoneNumber": "+221 78 968 25 96",
    "subscriberType": "POSTPAID",
    "tlServices": [
      {
        "id": 1,
        "activated": true,
        "serviceType": ServiceTypeEnum.SERV_VOICE,
        "targetNumber": ""
      }
    ]
  },
  {
    "id": 2,
    "createdAt": new Date(),
    "imsi": "3434343434",
    "name": "DUPONT Marie",
    "phoneNumber": "+221 77 123 45 67",
    "subscriberType": "POSTPAID",
    "tlServices": [
      {
        "id": 1,
        "activated": true,
        "serviceType": ServiceTypeEnum.SERV_VOLTE,
        "targetNumber": "123456789"
      },
      {
        "id": 2,
        "activated": false,
        "serviceType": ServiceTypeEnum.SERV_SMS,
        "targetNumber": ""
      }
    ]
  },
  {
    "id": 3,
    "createdAt": new Date(),
    "imsi": "5656565656",
    "name": "SMITH John",
    "phoneNumber": "+221 76 789 12 34",
    "subscriberType": "PREPAID",
    "tlServices": []
  },
  {
    "id": 4,
    "createdAt": new Date(),
    "imsi": "7878787878",
    "name": "BROWN Alice",
    "phoneNumber": "+221 75 456 78 90",
    "subscriberType": "POSTPAID",
    "tlServices": [
      {
        "id": 1,
        "activated": true,
        "serviceType": ServiceTypeEnum.SERV_VOICE,
        "targetNumber": "987654321"
      }
    ]
  },
  {
    "id": 5,
    "createdAt": new Date(),
    "imsi": "9090909090",
    "name": "CHEN Li",
    "phoneNumber": "+221 74 234 56 78",
    "subscriberType": "POSTPAID",
    "tlServices": []
  },
  {
    "id": 6,
    "createdAt": new Date(),
    "imsi": "1111111111",
    "name": "KIM Min",
    "phoneNumber": "+221 73 901 23 45",
    "subscriberType": "PREPAID",
    "tlServices": [
      {
        "id": 1,
        "activated": false,
        "serviceType": ServiceTypeEnum.SERV_VOLTE,
        "targetNumber": ""
      },
      {
        "id": 2,
        "activated": true,
        "serviceType": ServiceTypeEnum.SERV_SMS,
        "targetNumber": ""
      },
      {
        "id": 3,
        "activated": true,
        "serviceType": ServiceTypeEnum.SERV_VOICE,
        "targetNumber": "111222333"
      },
      {
        "id": 4,
        "activated": false,
        "serviceType": ServiceTypeEnum.SERV_ROAMING,
        "targetNumber": ""
      },
      {
        "id": 5,
        "activated": true,
        "serviceType": ServiceTypeEnum.SERV_3G,
        "targetNumber": "444555666"
      },
      {
        "id": 6,
        "activated": true,
        "serviceType": ServiceTypeEnum.SERV_5G,
        "targetNumber": ""
      }
    ]
  },
  {
    "id": 7,
    "createdAt": new Date(),
    "imsi": "2323232323",
    "name": "GARCIA Maria",
    "phoneNumber": "+221 72 678 90 12",
    "subscriberType": "POSTPAID",
    "tlServices": []
  },
  {
    "id": 8,
    "createdAt": new Date(),
    "imsi": "4545454545",
    "name": "WANG Wei",
    "phoneNumber": "+221 71 345 67 89",
    "subscriberType": "POSTPAID",
    "tlServices": [
      {
        "id": 1,
        "activated": true,
        "serviceType": ServiceTypeEnum.SERV_SMS,
        "targetNumber": "111222333"
      }
    ]
  },
  {
    "id": 9,
    "createdAt": new Date(),
    "imsi": "6767676767",
    "name": "YAMAMOTO Satoshi",
    "phoneNumber": "+221 70 012 34 56",
    "subscriberType": "PREPAID",
    "tlServices": [
      {
        "id": 1,
        "activated": false,
        "serviceType": ServiceTypeEnum.SERV_VOICE,
        "targetNumber": ""
      },
      {
        "id": 2,
        "activated": true,
        "serviceType": ServiceTypeEnum.SERV_5G,
        "targetNumber": "555444333"
      }
    ]
  },
  {
    "id": 10,
    "createdAt": new Date(),
    "imsi": "8989898989",
    "name": "LEE Ji-Hoon",
    "phoneNumber": "+221 79 567 89 01",
    "subscriberType": "POSTPAID",
    "tlServices": []
  }
]
