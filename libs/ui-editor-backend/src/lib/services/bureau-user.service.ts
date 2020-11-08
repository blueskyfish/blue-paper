/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BureauBaseService } from '../bureau-base-service';
import { BureauConfiguration } from '../bureau-configuration';
import { BureauHttpResponse } from '../bureau-http-response';
import { BureauRequestBuilder } from '../bureau-request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BpaLoginInfo } from '../models/bpa-login-info';
import { BpaLoginPayload } from '../models/bpa-login-payload';
import { BpaUserInfo } from '../models/bpa-user-info';


/**
 * The user access
 */
@Injectable({
  providedIn: 'root',
})
export class BureauUserService extends BureauBaseService {
  constructor(
    config: BureauConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation sendLogin
   */
  static readonly SendLoginPath = '/api/login';

  /**
   * User login
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendLogin$Response(params: {
      body: BpaLoginPayload
  }): Observable<BureauHttpResponse<BpaLoginInfo>> {

    const rb = new BureauRequestBuilder(this.rootUrl, BureauUserService.SendLoginPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as BureauHttpResponse<BpaLoginInfo>;
      })
    );
  }

  /**
   * User login
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sendLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendLogin(params: {
      body: BpaLoginPayload
  }): Observable<BpaLoginInfo> {

    return this.sendLogin$Response(params).pipe(
      map((r: BureauHttpResponse<BpaLoginInfo>) => r.body as BpaLoginInfo)
    );
  }

  /**
   * Path part for operation getUserInfo
   */
  static readonly GetUserInfoPath = '/api/user/info';

  /**
   * Get user information
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserInfo$Response(params?: {

  }): Observable<BureauHttpResponse<BpaUserInfo>> {

    const rb = new BureauRequestBuilder(this.rootUrl, BureauUserService.GetUserInfoPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as BureauHttpResponse<BpaUserInfo>;
      })
    );
  }

  /**
   * Get user information
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserInfo(params?: {

  }): Observable<BpaUserInfo> {

    return this.getUserInfo$Response(params).pipe(
      map((r: BureauHttpResponse<BpaUserInfo>) => r.body as BpaUserInfo)
    );
  }

}
