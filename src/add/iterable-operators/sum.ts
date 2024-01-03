import { IterableX } from '../../iterable/iterablex.js';
import { sum } from '../../iterable/sum.js';
import { MathOptions } from '../../iterable/mathoptions.js';

export function sumProto(this: IterableX<number>, options?: MathOptions<number>): number;
export function sumProto<T>(this: IterableX<T>, options?: MathOptions<T>): number;
export function sumProto(this: IterableX<any>, options?: MathOptions<any>): number {
  return sum(this, options);
}

IterableX.prototype.sum = sumProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    sum: typeof sumProto;
  }
}
