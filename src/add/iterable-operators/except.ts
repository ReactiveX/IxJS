import { IterableX } from '../../iterable';
import { except } from '../../iterable/except';

export function exceptProto<TSource>(
    this: IterableX<TSource>,
    second: IterableX<TSource>,
    cmp?: (x: TSource, y: TSource) => boolean): IterableX<TSource> {
  return new IterableX(except(this, second, cmp));
}

IterableX.prototype.except = exceptProto;

declare module '../../iterable' {
  interface IterableX<T> {
    except: typeof exceptProto;
  }
}