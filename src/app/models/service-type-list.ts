import {ServiceTypeEnum} from "./service-type.enum";

export class ServiceTypeList {
  value: ServiceTypeEnum;
  label: string;
  hasTargetNumber: boolean;
  targetNumber?: string
}
