import {ServiceTypeEnum} from "./service-type.enum";

export class TLService {
    id : number;
    serviceType: ServiceTypeEnum;
    activated: boolean;
    targetNumber: string;
}
