import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';

export class DialogHandler<D, R> {

  private _dismiss$: Subject<R> = new Subject<R>();

  get dismiss$(): Observable<R> {
    return this._dismiss$.asObservable();
  }

  get data(): D {
    return this._data;
  }

  constructor(private overlayRef: OverlayRef, private _data: D) {}

  dismiss(result?: R): void {
    this._dismiss$.next(result);
    this.overlayRef.dispose();
  }
}
