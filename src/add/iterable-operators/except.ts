import { IterableX } from '../../iterable';
import { except } from '../../iterable/except';

/**
 * @ignore
 */
export function exceptProto<TSource>(
    this: IterableX<TSource>,
    second: Iterable<TSource>,
    comparer?: (x: TSource, y: TSource) => boolean): IterableX<TSource> {
  return except(this, second, comparer);
}

IterableX.prototype.except = exceptProto;

declare module '../../iterable' {
  interface IterableX<T> {
    except: typeof exceptProto;
  }
}