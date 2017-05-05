import { identity } from '../internal/identity';

export async function average(source: AsyncIterable<number>, fn?: (x: number) => number): Promise<number>;
export async function average<T>(source: AsyncIterable<T>, fn?: (x: T) => number): Promise<number>;
export async function average(source: AsyncIterable<any>, fn: (x: any) => number = identity): Promise<number> {
  let sum = 0;
  let count = 0;
  for await (let item of source) {
    sum += fn(item);
    count++;
  }

  if (count === 0) {
    throw new Error('Empty collection');
  }

  return sum / count;
}
