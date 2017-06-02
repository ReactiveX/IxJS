import { identityAsync } from '../internal/identity';

export async function sum(
    source: AsyncIterable<number>,
    selector?: (x: number) => number | Promise<number>): Promise<number>;
export async function sum<T>(
    source: AsyncIterable<T>,
    selector: (x: T) => number | Promise<number>): Promise<number>;
export async function sum(
    source: AsyncIterable<any>,
    selector: (x: any) => number | Promise<number> = identityAsync): Promise<number> {
  let sum = 0;
  for await (let item of source) {
    sum += await selector(item);
  }

  return sum;
}
