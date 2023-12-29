import { Subscription } from './subscription';

// Older versions of Rx will polyfill Symbol.observable, which gets
// compiled into our UMD bundle. At runtime, our UMD bundle defines its
// version of Symbol.observable, and since it's not getting it from Rx via
// `require()` anymore, Rx defines and looks for a different Symbol.observable,
// instance, leading to mismatches.
// Assigning the global Symbol.observable to the one we bundle in here means
// that Rx's polyfill will pick it up. Alternatively if there's already a global
// Symbol.observable (like if Rx was required first), we should use that one inside Ix.

// Symbol.observable addition
// Note: This will add Symbol.observable globally for all TypeScript users
declare global {
  interface SymbolConstructor {
    readonly observable: symbol;
  }
}

// Symbol.observable or a string "@@observable". Used for interop.
// Referenced via string indexer so closure-compiler doesn't mangle.
/** @ignore */
export const observable = (typeof Symbol === 'function' && Symbol.observable) || '@@observable';

export interface NextObserver<T> {
  next: (value: T) => any;
  error?: (err: any) => any;
  complete?: () => any;
}

export interface ErrorObserver<T> {
  next?: (value: T) => any;
  error: (err: any) => any;
  complete?: () => any;
}

export interface CompletionObserver<T> {
  next?: (value: T) => any;
  error?: (err: any) => any;
  complete: () => any;
}

export type PartialObserver<T> = NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>;

export interface NextAsyncObserver<T> {
  next: (value: T) => any | Promise<any>;
  error?: (err: any) => any | Promise<any>;
  complete?: () => any | Promise<any>;
}

export interface ErrorAsyncObserver<T> {
  next?: (value: T) => any | Promise<any>;
  error: (err: any) => any | Promise<any>;
  complete?: () => any | Promise<any>;
}

export interface CompletionAsyncObserver<T> {
  next?: (value: T) => any | Promise<any>;
  error?: (err: any) => any | Promise<any>;
  complete: () => any | Promise<any>;
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
  subscribe(observer?: PartialObserver<T>): Subscription;
  subscribe(
    next?: null | ((value: T) => void),
    error?: null | ((error: any) => void),
    complete?: null | (() => void)
  ): Subscription;
}
