import { IterableX } from '../../iterable';
import { sum } from '../../iterable/sum';

export function sumProto(this: Iterable<number>, fn?: (x: number) => number): number;
export function sumProto<T>(this: Iterable<T>, fn: (x: T) => number): number;
/**
 * @ignore
 */
export function sumProto(this: Iterable<any>, fn: (x: any) => number = x => x): number {
  return sum(this, fn);
}

IterableX.prototype.sum = sumProto;

declare module '../../iterable' {
  interface IterableX<T> {
    sum: typeof sumProto;
  }
}