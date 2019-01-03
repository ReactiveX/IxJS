import { Subscription } from './subscription';

/** Symbol.observable addition */
/* Note: This will add Symbol.observable globally for all TypeScript users,
  however, we are no longer polyfilling Symbol.observable */
declare global {
  interface SymbolConstructor {
    readonly observable: symbol;
  }
}

/** Symbol.observable or a string "@@observable". Used for interop */
// @ts-ignore
import { observable as symbolObservable } from 'rxjs/_esm2015/symbol/observable';

let observableSymbol = symbolObservable;
if (typeof Symbol !== 'undefined') {
  // Older versions of Rx will polyfill Symbol.observable, which gets
  // compiled into our UMD bundle. Then, the Rx-polyfilled Symbol.observable
  // ends up being different than what's bundled into the UMD bundle, leading
  // do mismatches. Assigning the global Symbol.observable to the one we bundle
  // in here means that Rx's polyfill will pick it up. Alternatively if there's
  // already a global Symbol.observable, we should use that one inside Ix.
  if (typeof Symbol['observable'] === 'undefined') {
    (Symbol as any)['observable'] = observableSymbol;
  } else {
    observableSymbol = Symbol['observable'];
  }
}
export { observableSymbol as symbolObservable };

export interface NextObserver<T> {
  next: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
}

export interface ErrorObserver<T> {
  next?: (value: T) => void;
  error: (err: any) => void;
  complete?: () => void;
}

export interface CompletionObserver<T> {
  next?: (value: T) => void;
  error?: (err: any) => void;
  complete: () => void;
}

export type PartialObserver<T> = NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>;

export interface NextAsyncObserver<T> {
  next: (value: T) => void | Promise<void>;
  error?: (err: any) => void | Promise<void>;
  complete?: () => void | Promise<void>;
}

export interface ErrorAsyncObserver<T> {
  next?: (value: T) => void | Promise<void>;
  error: (err: any) => void | Promise<void>;
  complete?: () => void | Promise<void>;
}

export interface CompletionAsyncObserver<T> {
  next?: (value: T) => void | Promise<void>;
  error?: (err: any) => void | Promise<void>;
  complete: () => void | Promise<void>;
}

export type PartialAsyncObserver<T> =
  | NextAsyncObserver<T>
  | ErrorAsyncObserver<T>
  | CompletionAsyncObserver<T>;

export interface Observer<T> {
  closed?: boolean;
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}

export interface Observable<T> {
  [Symbol.observable]: () => Observable<T>;
  subscribe: (
    observerOrNext?: PartialObserver<T> | ((value: T) => void),
    error?: (err: any) => void,
    complete?: () => void
  ) => Subscription;
}
