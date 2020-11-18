import { SubscriptionLike } from 'rxjs';

/**
 * A list of subscriptions that become unsubscribes in bulk.
 */
export class SubscriberList implements SubscriptionLike {

  private _list: SubscriptionLike[] = [];

  private _closed = false;

  get closed(): boolean {
    return this._closed;
  }

  add(s: SubscriptionLike): SubscriptionLike {
    if (s != null) {
      this._list.push(s);
    }
    return s;
  }

  unsubscribe(): void {
    this._closed = true;
    this._list.forEach(s => s.unsubscribe());
  }

}
