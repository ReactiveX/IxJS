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
//tslint:disable-next-line
const { observable: Symbol_observable } = require('rxjs/symbol/observable');

let symbolObservable = Symbol_observable;
if (typeof Symbol !== 'undefined') {
  // Older versions of Rx will polyfill Symbol.observable, which gets
  // compiled into our UMD bundle. At runtime, our UMD bundle defines its
  // version of Symbol.observable, and since it's not getting it from Rx via
  // `require()` anymore, Rx defines and looks for a different Symbol.observable,
  // instance, leading to mismatches.
  // Assigning the global Symbol.observable to the one we bundle in here means
  // that Rx's polyfill will pick it up. Alternatively if there's already a global
  // Symbol.observable (like if Rx was required first), we should use that one inside Ix.
  if (typeof Symbol['observable'] === 'undefined') {
    (Symbol as any)['observable'] = symbolObservable;
  } else {
    symbolObservable = Symbol['observable'];
  }
}
export { symbolObservable };

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
