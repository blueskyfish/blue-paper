/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BureauBaseService } from '../bureau-base-service';
import { BureauConfiguration } from '../bureau-configuration';
import { BureauHttpResponse } from '../bureau-http-response';
import { BureauRequestBuilder } from '../bureau-request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BpaEditorMenuItem } from '../models/bpa-editor-menu-item';

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
   * Path part for operation getEditorMenuList
   */
  static readonly GetEditorMenuListPath = '/api/editor/menu';

  /**
   * The menu list of the frontend
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEditorMenuList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEditorMenuList$Response(params?: {

  }): Observable<BureauHttpResponse<Array<BpaEditorMenuItem>>> {

    const rb = new BureauRequestBuilder(this.rootUrl, BureauAdminService.GetEditorMenuListPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as BureauHttpResponse<Array<BpaEditorMenuItem>>;
      })
    );
  }

  /**
   * The menu list of the frontend
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEditorMenuList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEditorMenuList(params?: {

  }): Observable<Array<BpaEditorMenuItem>> {

    return this.getEditorMenuList$Response(params).pipe(
      map((r: BureauHttpResponse<Array<BpaEditorMenuItem>>) => r.body as Array<BpaEditorMenuItem>)
    );
  }

}
