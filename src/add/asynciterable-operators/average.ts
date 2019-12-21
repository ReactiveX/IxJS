import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { identityAsync } from '../../util/identity';
import { average } from '../../asynciterable/average';

export function averageProto(
  this: AsyncIterableX<number>,
  selector?: (x: number) => number | Promise<number>
): Promise<number>;
export function averageProto<T>(
  this: AsyncIterableX<T>,
  selector?: (x: T) => number | Promise<number>
): Promise<number>;
/**
 * @ignore
 */
export function averageProto(
  this: AsyncIterableX<any>,
  selector: (x: any) => number | Promise<number> = identityAsync
): Promise<number> {
  return average(this, selector);
}

AsyncIterableX.prototype.average = averageProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    average: typeof averageProto;
  }
}
