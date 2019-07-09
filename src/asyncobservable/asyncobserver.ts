import { AsyncObserver } from './types';

enum ObserverState {
  Idle,
  Busy,
  Done
}

export abstract class AsyncSubscriberBase<T> implements AsyncObserver<T> {
  private _state: ObserverState = ObserverState.Idle;

  protected abstract nextAsyncCore(value: T): Promise<void>;

  nextAsync(value: T) {
    this.tryEnter();

    try {
      return this.nextAsyncCore(value);
    } finally {
      this._state = ObserverState.Idle;
    }
  }

  protected abstract errorAsyncCore(error: any): Promise<void>;

  errorAsync(error: any) {
    this.tryEnter();

    try {
      return this.errorAsyncCore(error);
    } finally {
      this._state = ObserverState.Done;
    }
  }

  protected abstract completeAsyncCore(): Promise<void>;

  completeAsync() {
    this.tryEnter();

    try {
      return this.completeAsyncCore();
    } finally {
      this._state = ObserverState.Done;
    }
  }

  private tryEnter() {
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

export class AsyncSubscriber<T> extends AsyncSubscriberBase<T> {
  private _next: (value: T) => Promise<void>;
  private _error: (error: any) => Promise<void>;
  private _complete: () => Promise<void>;

  constructor(
    next: (value: T) => Promise<void>,
    error: (error: any) => Promise<void>,
    complete: () => Promise<void>
  ) {
    super();
    this._next = next;
    this._error = error;
    this._complete = complete;
  }

  nextAsyncCore(value: T) {
    return this._next(value);
  }
  errorAsyncCore(error: any) {
    return this._error(error);
  }
  completeAsyncCore() {
    return this._complete();
  }
}
