import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { sum } from '../../asynciterable/sum.js';
import { MathOptions } from '../../asynciterable/mathoptions.js';

export function sumProto(
  this: AsyncIterable<number>,
  options?: MathOptions<number>
): Promise<number>;
export function sumProto<T>(this: AsyncIterable<T>, options?: MathOptions<T>): Promise<number>;
export function sumProto(this: AsyncIterable<any>, options?: MathOptions<any>): Promise<number> {
  return sum(this, options);
}

AsyncIterableX.prototype.sum = sumProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    sum: typeof sumProto;
  }
}
