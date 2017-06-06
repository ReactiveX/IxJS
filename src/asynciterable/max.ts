import { identityAsync } from '../internal/identity';

export async function max(
    source: AsyncIterable<number>,
    selector?: (x: number) => number | Promise<number>): Promise<number>;
export async function max<T>(
    source: AsyncIterable<T>,
    selector: (x: T) => number | Promise<number>): Promise<number>;
export async function max(
    source: AsyncIterable<any>,
    selector: (x: any) => number | Promise<number> = identityAsync): Promise<number> {
  let atleastOnce = false;
  let value = -Infinity;
  for await (let item of source) {
    if (!atleastOnce) {
      atleastOnce = true;
    }
    let x = await selector(item);
    if (x > value) { value = x; }
  }
  if (!atleastOnce) {
    throw new Error('Sequence contains no elements');
  }

  return value;
}
