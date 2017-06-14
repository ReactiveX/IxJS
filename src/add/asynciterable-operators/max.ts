import { AsyncIterableX } from '../../asynciterable';
import { max } from '../../asynciterable/max';
import { identityAsync } from '../../internal/identity';

export function maxProto(
    this: AsyncIterableX<number>,
    selector?: (x: number) => number): Promise<number>;
export function maxProto<T>(
  this: AsyncIterableX<T>,
  selector: (x: T) => number): Promise<number>;
/**
 * @ignore
 */
export function maxProto(
    this: AsyncIterableX<any>,
    selector: (x: any) => number | Promise<number> = identityAsync): Promise<number> {
  return max(this, selector);
}

AsyncIterableX.prototype.max = maxProto;

declare module '../../asynciterable' {
  interface AsyncIterableX<T> {
    max: typeof maxProto;
  }
}