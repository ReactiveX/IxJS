import { identityAsync } from '../util/identity';

export async function sum(
  source: AsyncIterable<number> | Iterable<number>,
  selector?: (x: number) => number | Promise<number>
): Promise<number>;
export async function sum<T>(
  source: AsyncIterable<T> | Iterable<T>,
  selector: (x: T) => number | Promise<number>
): Promise<number>;
export async function sum(
  source: AsyncIterable<any> | Iterable<any>,
  selector: (x: any) => number | Promise<number> = identityAsync
): Promise<number> {
  let sum = 0;
  for await (let item of source) {
    sum += await selector(item);
  }

  return sum;
}
