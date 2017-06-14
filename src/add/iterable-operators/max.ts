import { IterableX } from '../../iterable';
import { max } from '../../iterable/max';

export function maxProto(this: IterableX<number>, fn?: (x: number) => number): number;
export function maxProto<T>(this: IterableX<T>, fn: (x: T) => number): number;
/**
 * @ignore
 */
export function maxProto(this: IterableX<any>, fn: (x: any) => number = x => x): number {
  return max(this, fn);
}

IterableX.prototype.max = maxProto;

declare module '../../iterable' {
  interface IterableX<T> {
    max: typeof maxProto;
  }
}