/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BureauBaseService } from '../bureau-base-service';
import { BureauConfiguration } from '../bureau-configuration';
import { BureauHttpResponse } from '../bureau-http-response';
import { BureauRequestBuilder } from '../bureau-request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BpaHtmlData } from '../models/bpa-html-data';
import { BpaPaperInfo } from '../models/bpa-paper-info';

@Injectable({
  providedIn: 'root',
})
export class BureauPaperService extends BureauBaseService {
  constructor(
    config: BureauConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getHtmlPage
   */
  static readonly GetHtmlPagePath = '/api/pages/{pageUrl}.json';

  /**
   * Get the html data from given page
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getHtmlPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHtmlPage$Response(params: {

    /**
     * The page url
     */
    pageUrl: string;

  }): Observable<BureauHttpResponse<BpaHtmlData>> {

    const rb = new BureauRequestBuilder(this.rootUrl, BureauPaperService.GetHtmlPagePath, 'get');
    if (params) {

      rb.path('pageUrl', params.pageUrl, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as BureauHttpResponse<BpaHtmlData>;
      })
    );
  }

  /**
   * Get the html data from given page
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getHtmlPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getHtmlPage(params: {

    /**
     * The page url
     */
    pageUrl: string;

  }): Observable<BpaHtmlData> {

    return this.getHtmlPage$Response(params).pipe(
      map((r: BureauHttpResponse<BpaHtmlData>) => r.body as BpaHtmlData)
    );
  }

  /**
   * Path part for operation getPaperInfo
   */
  static readonly GetPaperInfoPath = '/api/papers/{pageUrl}.json';

  /**
   * Get the paper information
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPaperInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaperInfo$Response(params: {

    /**
     * The page url
     */
    pageUrl: string;

  }): Observable<BureauHttpResponse<BpaPaperInfo>> {

    const rb = new BureauRequestBuilder(this.rootUrl, BureauPaperService.GetPaperInfoPath, 'get');
    if (params) {

      rb.path('pageUrl', params.pageUrl, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as BureauHttpResponse<BpaPaperInfo>;
      })
    );
  }

  /**
   * Get the paper information
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPaperInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPaperInfo(params: {

    /**
     * The page url
     */
    pageUrl: string;

  }): Observable<BpaPaperInfo> {

    return this.getPaperInfo$Response(params).pipe(
      map((r: BureauHttpResponse<BpaPaperInfo>) => r.body as BpaPaperInfo)
    );
  }

}
