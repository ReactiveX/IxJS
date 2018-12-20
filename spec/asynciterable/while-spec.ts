import * as Ix from '../Ix';
const { defer } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { tap } = Ix.asynciterable;
const { _while } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#while some', async () => {
  let x = 5;
  const res = _while(
    async () => x > 0,
    defer(async () =>
      tap(of(x), {
        next: async () => {
          x--;
        }
      })
    )
  );

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 5);
  await hasNext(it, 4);
  await hasNext(it, 3);
  await hasNext(it, 2);
  await hasNext(it, 1);
  await noNext(it);
});

test('AsyncIterable#while none', async () => {
  let x = 0;
  const res = _while(
    async () => x > 0,
    defer(async () =>
      tap(of(x), {
        next: async () => {
          x--;
        }
      })
    )
  );

  const it = res[Symbol.asyncIterator]();
  await noNext(it);
});
