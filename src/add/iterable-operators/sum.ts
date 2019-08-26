import { IterableX } from '../../iterable/iterablex';
import { sum } from '../../iterable/sum';

export function sumProto(this: IterableX<number>, fn?: (x: number) => number): number;
export function sumProto<T>(this: IterableX<T>, fn: (x: T) => number): number;
/**
 * @ignore
 */
export function sumProto(this: IterableX<any>, fn: (x: any) => number = x => x): number {
  return sum(this, fn);
}

IterableX.prototype.sum = sumProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    sum: typeof sumProto;
  }
}
