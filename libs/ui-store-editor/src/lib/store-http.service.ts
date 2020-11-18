import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthStorageService } from '@blue-paper/ui-commons';
import { Store } from '@ngrx/store';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { LoaderActions } from './loader';
import { LoaderPartialSate } from './loader/loader.reducer';
import { StoreHttpConfig } from './store-http-config';

export const HIDE_LOADING_DELAY = 400;

@Injectable()
export class StoreHttpService implements HttpInterceptor {
  /**
   * Subject for setting the loader to `true`.
   */
  private showLoading$: Subject<boolean> = new Subject();

  /**
   * Subject for setting the loader to `false`.
   */
  private hideLoading$: Subject<boolean> = new Subject();

  constructor(
    private config: StoreHttpConfig,
    private authService: AuthStorageService,
    private store: Store<LoaderPartialSate>
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isBackendCall = this.authService.hasToken() && this.isBackendUrl(req.url);

    if (isBackendCall) {
      // show the loader
      this.showLoading();

      req = req.clone({
        setHeaders: this.createHeaders()
      });
    }

    return next.handle(req)
      .pipe(
        tap(
          (x: HttpEvent<any>) => {
            if (isBackendCall) {
              this.hideLoading();
            }
          },
          (err) => {
            if (isBackendCall) {
              this.hideLoading();
            }
          }
        )
      );
  }

  private createHeaders() {
    return {
      [this.config.headerName]: this.authService.getToken()
    };
  }

  private isBackendUrl(url: string): boolean {
    return url.indexOf(this.config.baseApiUrl) >= 0;
  }

  private hideLoading(): void {
    this.hideLoading$.next(false);
  }

  private showLoading(): void {
    this.showLoading$.next(true);
  }

  private subscribeForLoading() {
    merge(
      this.showLoading$,
      this.hideLoading$
        .pipe(debounceTime(HIDE_LOADING_DELAY))
    ).pipe(
      distinctUntilChanged()
    ).subscribe((isLoading: boolean) => {
      this.store.dispatch(isLoading ? LoaderActions.showLoader() : LoaderActions.hideLoader());
    });
  }
}
