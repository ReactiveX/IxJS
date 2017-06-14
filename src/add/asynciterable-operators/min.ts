import { AsyncIterableX } from '../../asynciterable';
import { min } from '../../asynciterable/min';
import { identityAsync } from '../../internal/identity';

export function minProto(
    this: AsyncIterableX<number>,
    selector?: (x: number) => number | Promise<number>): Promise<number>;
export function minProto<T>(
    this: AsyncIterableX<T>,
    selector: (x: T) => number | Promise<number>): Promise<number>;
/**
 * @ignore
 */
export function minProto(
    this: AsyncIterableX<any>,
    selector: (x: any) => number | Promise<number> = identityAsync): Promise<number> {
  return min(this, selector);
}

AsyncIterableX.prototype.min = minProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    min: typeof minProto;
  }
}