import {
  AsyncObservable,
  AsyncObserver,
  AsyncSubscription,
  OperatorAsyncObservableFunction,
} from '../../interfaces';
import { AsyncObservableX } from '../asyncobservablex';
import { AsyncObserverX } from '../asyncobserverx';
import { subscribeSafe } from '../subscribesafe';

/**
 * The options for performing a scan operation, including the callback and the optional seed.
 *
 * @export
 * @interface ScanOptions
 * @template T The type of the elements in the source sequence.
 * @template R The type of the result for the reducer callback.
 */
export interface ScanOptions<T, R> {
  /**
   * The optional seed used for the scan operation.
   *
   * @type {R} The type of the result
   * @memberof ScanOptions
   */
  seed?: R;
  /**
   * The callback used for the scan operation, which passes the accumulator, current value, the
   * current index, and an Abort Signal.  This returns a result or a Promise containing a result.
   *
   * @memberof ScanOptions
   */
  callback: (accumulator: R, current: T, index: number, signal?: AbortSignal) => R | Promise<R>;
}

class ScanObserver<T, R = T> extends AsyncObserverX<T> {
  private _observer: AsyncObserver<R>;
  private _fn: (acc: R, x: T, index: number, signal?: AbortSignal) => R | Promise<R>;
  private _seed?: T | R;
  private _hasSeed: boolean;
  private _signal?: AbortSignal;
  private _index: number;
  private _hasValue: boolean;
  private _acc: T | R | undefined;

  constructor(observer: AsyncObserver<R>, options: ScanOptions<T, R>, signal?: AbortSignal) {
    super();
    this._observer = observer;
    this._fn = options['callback'];
    this._hasSeed = options.hasOwnProperty('seed');
    this._seed = options['seed'];
    this._signal = signal;
    this._index = 0;
    this._hasValue = false;
    this._acc = this._seed;
  }

  async _next(value: T): Promise<void> {
    if (this._hasValue || (this._hasValue = this._hasSeed)) {
      try {
        this._acc = await this._fn(<R> this._acc, value, this._index++, this._signal);
      } catch (e) {
        await this._observer.error(e);
        return;
      }
    } else {
      this._acc = value;
      this._hasValue = true;
      this._index++;
    }

    await this._observer.next(<R> this._acc);
  }

  async _error(err: any) {
    await this._observer.error(err);
  }

  async _complete() {
    await this._observer.complete();
  }
}

export class ScanAsyncObservable<T, R> extends AsyncObservableX<R> {
  private _source: AsyncObservable<T>;
  private _options: ScanOptions<T, R>;

  constructor(source: AsyncObservable<T>, options: ScanOptions<T, R>) {
    super();
    this._source = source;
    this._options = options;
  }

  _subscribeAsync(observer: AsyncObserver<R>, signal?: AbortSignal): Promise<AsyncSubscription> {
    return subscribeSafe(
      this._source,
      new ScanObserver<T, R>(observer, this._options, signal),
      signal
    );
  }
}

/**
 * Applies an accumulator function over an async-observable sequence and returns each intermediate result.
 * The specified seed value, if given, is used as the initial accumulator value.
 *
 * @export
 * @template T The type of the elements in the source sequence.
 * @template R The type of the result of the aggregation.
 * @param {ScanOptions<T, R>} options The options including the accumulator function and seed.
 * @returns {OperatorAsyncObservableFunction<T, R>} An async-enumerable sequence containing the accumulated values.
 */
export function scan<T, R = T>(options: ScanOptions<T, R>): OperatorAsyncObservableFunction<T, R> {
  return function scanOperatorFunction(source: AsyncObservable<T>): AsyncObservableX<R> {
    return new ScanAsyncObservable(source, options);
  };
}
