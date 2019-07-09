import { AsyncSubscriberBase } from '../asyncobserver';
import { AsyncObserver, AsyncUnsubscribable, AsyncObservableOperatorFunction } from '../types';
import { AsyncObservableBase } from '../asyncobservable';

class MapAsyncObserver<T, R> extends AsyncSubscriberBase<T> {
  private _observer: AsyncObserver<R>;
  private _selector: (value: T, index: number) => R | Promise<R>;
  private _index: number;

  constructor(observer: AsyncObserver<R>, selector: (value: T, index: number) => R | Promise<R>) {
    super();
    this._observer = observer;
    this._selector = selector;
    this._index = 0;
  }

  protected async nextAsyncCore(value: T): Promise<void> {
    let result = null;
    let hasResult = false;

    try {
      result = await this._selector(value, this._index++);
      hasResult = true;
    } catch (err) {
      await this._observer.errorAsync(err);
      return;
    }

    if (hasResult) {
      await this._observer.nextAsync(result);
    }
  }

  protected errorAsyncCore(error: any): Promise<void> {
    return this._observer.errorAsync(error);
  }

  protected completeAsyncCore(): Promise<void> {
    return this._observer.completeAsync();
  }
}

class MapAsyncObservable<T, R> extends AsyncObservableBase<R> {
  private _source: AsyncObservableBase<T>;
  private _selector: (value: T, index: number) => R | Promise<R>;

  constructor(
    source: AsyncObservableBase<T>,
    selector: (value: T, index: number) => R | Promise<R>
  ) {
    super();
    this._source = source;
    this._selector = selector;
  }

  protected subscribeAsyncCore(observer: AsyncObserver<R>): Promise<AsyncUnsubscribable> {
    return this._source.subscribeSafeAsync(new MapAsyncObserver<T, R>(observer, this._selector));
  }
}

export function map<TSource, TResult>(
  selector: (value: TSource, index: number) => TResult
): AsyncObservableOperatorFunction<TSource, TResult> {
  return function mapOperatorFunction(
    source: AsyncSubscribable<TSource>
  ): AsyncSubscribable<TResult> {
    return new MapAsyncObservable<TSource, TResult>(source, selector);
  };
}
