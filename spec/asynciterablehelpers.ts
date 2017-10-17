export async function hasNext<T>(t: any, source: AsyncIterator<T>, expected: T) {
  const { done, value } = await source.next();
  t.false(done, 'should not be done');
  t.deepEqual(value, expected);
}

export async function noNext<T>(t: any, source: AsyncIterator<T>) {
  const next = await source.next();
  t.true(next.done, 'should be done');
}

export function delayValue<T>(item: T, delay: number): Promise<T> {
  return new Promise<T>(res => {
    let id: any = setInterval(() => {
      clearInterval(id);
      id = undefined;
      res(item);
    }, delay);
  });
}
