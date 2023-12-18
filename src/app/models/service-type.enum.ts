export enum ServiceTypeEnum {
  SERV_VOLTE = "SERV_VOLTE",
  SERV_ROAMING = "SERV_ROAMING",
  SERV_5G = "SERV_5G",
  SERV_LTE = "SERV_LTE",
  SERV_3G = "SERV_3G",
  SERV_VOICE = "SERV_VOICE",
  SERV_SMS = "SERV_SMS",
  SERV_CFWNOREPLY = "SERV_CFWNOREPLY",
  SERV_CFWNOREACH = "SERV_CFWNOREACH",
  SERV_CRBT = "SERV_CRBT"
}

export const SERVICE_TYPE_MAP = [
  {value: ServiceTypeEnum.SERV_VOLTE, label: "VoLTE", hasTargetNumber: false},
  {value: ServiceTypeEnum.SERV_ROAMING, label: "Roaming", hasTargetNumber: false},
  {value: ServiceTypeEnum.SERV_5G, label: "5G", hasTargetNumber: false},
  {value: ServiceTypeEnum.SERV_LTE, label: "LTE", hasTargetNumber: false},
  {value: ServiceTypeEnum.SERV_3G, label: "3G", hasTargetNumber: false},
  {value: ServiceTypeEnum.SERV_VOICE, label: "Voice", hasTargetNumber: false},
  {value: ServiceTypeEnum.SERV_SMS, label: "SMS", hasTargetNumber: false},
  {value: ServiceTypeEnum.SERV_CFWNOREPLY, label: "Call Forwarding", hasTargetNumber: true},
  {value: ServiceTypeEnum.SERV_CFWNOREACH, label: "Call Forwarding Noreach", hasTargetNumber: true},
  {value: ServiceTypeEnum.SERV_CRBT, label: "Ringback Tone", hasTargetNumber: false},
]
