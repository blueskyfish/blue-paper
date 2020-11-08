/* tslint:disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class BureauConfiguration {
  rootUrl: string = '';
}

/**
 * Parameters for `UiEditorBackendModule.forRoot()`
 */
export interface BureauConfigurationParams {
  rootUrl?: string;
}
