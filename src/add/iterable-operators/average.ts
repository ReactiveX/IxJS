import { IterableX } from '../../iterable/iterablex.js';
import { average } from '../../iterable/average.js';
import { MathOptions } from '../../iterable/mathoptions.js';

export function averageProto(this: IterableX<number>, options?: MathOptions<number>): number;
export function averageProto<T>(this: IterableX<T>, options?: MathOptions<T>): number;
export function averageProto(this: IterableX<any>, options?: MathOptions<any>): number {
  return average(this, options);
}

IterableX.prototype.average = averageProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    average: typeof averageProto;
  }
}
