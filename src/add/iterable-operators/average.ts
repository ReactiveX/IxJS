import { IterableImpl } from '../../iterable';
import { average } from '../../iterable/average';

function averageProto<T>(this: IterableImpl<T>, fn?: (value: T) => number) {
  return average<T>(this, fn);
};
IterableImpl.prototype.average = averageProto;

declare module '../../Iterable' {
  interface IterableImpl<T> {
    average: typeof averageProto;
  }
}