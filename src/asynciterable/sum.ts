import { identity } from '../internal/identity';

export async function sum(source: AsyncIterable<number>, fn?: (x: number) => number): Promise<number>;
export async function sum<T>(source: AsyncIterable<T>, fn: (x: T) => number): Promise<number>;
export async function sum(source: AsyncIterable<any>, fn: (x: any) => number = identity): Promise<number> {
  let sum = 0;
  for await (let item of source) {
    sum += fn(item);
  }

  return sum;
}
