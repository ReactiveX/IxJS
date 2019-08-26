import { IterableX } from '../../iterable/iterablex';
import { identity } from '../../util/identity';
import { average } from '../../iterable/average';

export function averageProto(this: IterableX<number>, selector?: (x: number) => number): number;
export function averageProto<T>(this: IterableX<T>, selector?: (x: T) => number): number;
/**
 * @ignore
 */
export function averageProto(
  this: IterableX<any>,
  selector: (x: any) => number = identity
): number {
  return average(this, selector);
}

IterableX.prototype.average = averageProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    average: typeof averageProto;
  }
}
