/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BureauBaseService } from '../bureau-base-service';
import { BureauConfiguration } from '../bureau-configuration';
import { BureauHttpResponse } from '../bureau-http-response';
import { BureauRequestBuilder } from '../bureau-request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BpaTreeRootMenu } from '../models/bpa-tree-root-menu';

@Injectable({
  providedIn: 'root',
})
export class BureauAdminService extends BureauBaseService {
  constructor(
    config: BureauConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEditorTreeMenuList
   */
  static readonly GetEditorTreeMenuListPath = '/api/editor/menu';

  /**
   * The menu list as tree nodes
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEditorTreeMenuList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEditorTreeMenuList$Response(params?: {

  }): Observable<BureauHttpResponse<Array<BpaTreeRootMenu>>> {

    const rb = new BureauRequestBuilder(this.rootUrl, BureauAdminService.GetEditorTreeMenuListPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as BureauHttpResponse<Array<BpaTreeRootMenu>>;
      })
    );
  }

  /**
   * The menu list as tree nodes
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEditorTreeMenuList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEditorTreeMenuList(params?: {

  }): Observable<Array<BpaTreeRootMenu>> {

    return this.getEditorTreeMenuList$Response(params).pipe(
      map((r: BureauHttpResponse<Array<BpaTreeRootMenu>>) => r.body as Array<BpaTreeRootMenu>)
    );
  }

}
