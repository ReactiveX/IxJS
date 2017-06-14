import { AsyncIterableX } from '../../asynciterable';
import { except } from '../../asynciterable/except';

/**
 * @ignore
 */
export function exceptProto<TSource>(
  this: AsyncIterableX<TSource>,
  second: AsyncIterable<TSource>,
  comparer?: (x: TSource, y: TSource) => boolean | Promise<boolean>): AsyncIterableX<TSource> {
  return except(this, second, comparer);
}

AsyncIterableX.prototype.except = exceptProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    except: typeof exceptProto;
  }
}