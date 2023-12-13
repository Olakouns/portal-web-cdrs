import { SubscriberType } from "./subscriber-type";
import { TLService } from "./tlservice";

export class SubscriberUser {
    id: number;
    name: string;
    phoneNumber: string;
    imsi: string;
    createdAt: Date;
    subscriberType: SubscriberType | string;
    tlServices: Array<TLService>;
}
