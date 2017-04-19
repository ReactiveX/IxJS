import { IterableX } from '../../iterable';
import { average } from '../../iterable/average';

export function averageProto<T>(this: IterableX<T>, fn?: (value: T) => number) {
  return average<T>(this, fn);
};
IterableX.prototype.average = averageProto;

declare module '../../Iterable' {
  interface IterableX<T> {
    average: typeof averageProto;
  }
}