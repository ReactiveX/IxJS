import { identity } from '../internal/identity';

export async function max(source: AsyncIterable<number>, fn?: (x: number) => number): Promise<number>;
export async function max<T>(source: AsyncIterable<T>, fn: (x: T) => number): Promise<number>;
export async function max(source: AsyncIterable<any>, fn: (x: any) => number = identity): Promise<number> {
  let atleastOnce = false;
  let value = -Infinity;
  for await (let item of source) {
    if (!atleastOnce) {
      atleastOnce = true;
    }
    let x = fn(item);
    if (x > value) { value = x; }
  }
  if (!atleastOnce) {
    throw new Error('Sequence contains no elements');
  }

  return value;
}
