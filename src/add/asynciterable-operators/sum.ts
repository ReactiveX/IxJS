import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { sum } from '../../asynciterable/sum';
import { MathOptions } from '../../asynciterable/mathoptions';

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
