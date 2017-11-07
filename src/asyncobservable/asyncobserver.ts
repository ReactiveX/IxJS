export interface NextAsyncObserver<T> {
  next: (value: T) => Promise<void>;
  error?: (err: any) => Promise<void>;
  complete?: () => Promise<void>;
}

export interface ErrorAsyncObserver<T> {
  next?: (value: T) => Promise<void>;
  error: (err: any) => Promise<void>;
  complete?: () => Promise<void>;
}

export interface CompletionAsyncObserver<T> {
  next?: (value: T) => Promise<void>;
  error?: (err: any) => Promise<void>;
  complete: () => Promise<void>;
}

export type PartialAsyncObserver<T> =
  | NextAsyncObserver<T>
  | ErrorAsyncObserver<T>
  | CompletionAsyncObserver<T>;

export interface AsyncObserver<T> {
  next: (value: T) => Promise<void>;
  error: (err: any) => Promise<void>;
  complete: () => Promise<void>;
}

enum ObserverState {
  Idle,
  Busy,
  Done
}

export abstract class AsyncObserverX<T> implements AsyncObserver<T> {
  private _state: ObserverState = ObserverState.Idle;

  next(value: T) {
    this._tryEnter();
    try {
      return this._next(value);
    } finally {
      this._state = ObserverState.Idle;
    }
  }

  abstract _next(value: T): Promise<void>;

  error(err: any) {
    this._tryEnter();
    try {
      return this._error(err);
    } finally {
      this._state = ObserverState.Done;
    }
  }

  abstract _error(err: any): Promise<void>;

  complete() {
    this._tryEnter();
    try {
      return this._complete();
    } finally {
      this._state = ObserverState.Done;
    }
  }

  abstract _complete(): Promise<void>;

  private _tryEnter() {
    const old = this._state;
    if (old === ObserverState.Idle) {
      this._state = ObserverState.Busy;
    } else if (old === ObserverState.Busy) {
      throw new Error('Observer is already busy');
    } else if (old === ObserverState.Done) {
      throw new Error('Observer has already terminated');
    }
  }
}
