/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BureauBaseService } from '../bureau-base-service';
import { BureauConfiguration } from '../bureau-configuration';
import { BureauHttpResponse } from '../bureau-http-response';
import { BureauRequestBuilder } from '../bureau-request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BpaHello } from '../models/bpa-hello';


/**
 * System functions
 */
@Injectable({
  providedIn: 'root',
})
export class BureauSystemService extends BureauBaseService {
  constructor(
    config: BureauConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getHello
   */
  static readonly GetHelloPath = '/api';

  /**
   * Check the backend
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHello()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHello$Response(params?: {

    /**
     * The optional name
     */
    name?: string;

  }): Observable<BureauHttpResponse<BpaHello>> {

    const rb = new BureauRequestBuilder(this.rootUrl, BureauSystemService.GetHelloPath, 'get');
    if (params) {

      rb.query('name', params.name, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as BureauHttpResponse<BpaHello>;
      })
    );
  }

  /**
   * Check the backend
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getHello$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHello(params?: {

    /**
     * The optional name
     */
    name?: string;

  }): Observable<BpaHello> {

    return this.getHello$Response(params).pipe(
      map((r: BureauHttpResponse<BpaHello>) => r.body as BpaHello)
    );
  }

}
