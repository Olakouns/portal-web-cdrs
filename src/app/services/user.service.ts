import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SubscriberUser} from "../models/subscriber-user";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ApiResponse} from "../models/api-response";
import {TLService} from "../models/tlservice";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   *  use to create a new subscriber
   * @param subscriberUser
   */
  createSubscriber(subscriberUser: SubscriberUser): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${environment.BASE_URL}/create-subscriber`, subscriberUser);
  }


  /**
   * use add services to subscriber
   * @param phoneNumber
   * @param services
   */
  addServiceToSubscriber(phoneNumber: string, services: Array<TLService>): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(`${environment.BASE_URL}/add-services/${phoneNumber}`, services);
  }

  /**
   * use to remove services from subscriber
   * @param phoneNumber
   * @param services
   */
  removeServiceFromSubscriber(phoneNumber: string, services: Array<TLService>): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(`${environment.BASE_URL}/remove-services/${phoneNumber}`, services);
  }

  /**
   * use to disable or enable a subscriber service
   * @param phoneNumber
   * @param suspend
   */
  suspendOrActivateSubscriber(phoneNumber: string, suspend: boolean): Observable<ApiResponse> {
    let params = new HttpParams().set('suspend', suspend.toString());
    return this.httpClient.put<ApiResponse>(`${environment.BASE_URL}/service-subscriber/${phoneNumber}`, {}, {params: params});
  }


  /**
   * use to delete a subscriber
   * @param phoneNumber
   */
  deleteSubscriber(phoneNumber: string): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(`${environment.BASE_URL}/un-activated/${phoneNumber}`);
  }
}
