import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { average } from '../../asynciterable/average';
import { MathOptions } from '../../asynciterable/mathoptions';

export function averageProto(
  this: AsyncIterable<number>,
  options?: MathOptions<number>
): Promise<number>;
export function averageProto<TSource>(
  this: AsyncIterable<TSource>,
  options?: MathOptions<TSource>
): Promise<number>;
export function averageProto(
  this: AsyncIterable<any>,
  options?: MathOptions<any>
): Promise<number> {
  return average(this, options);
}

AsyncIterableX.prototype.average = averageProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    average: typeof averageProto;
  }
}
