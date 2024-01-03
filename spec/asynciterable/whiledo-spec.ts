import { hasNext, noNext } from '../asynciterablehelpers.js';
import { defer, of, whileDo } from 'ix/asynciterable/index.js';
import { tap } from 'ix/asynciterable/operators/index.js';

test('AsyncIterable#whileDo some', async () => {
  let x = 5;
  const res = whileDo(
    defer(async () =>
      of(x).pipe(
        tap({
          next: async () => {
            x--;
          },
        })
      )
    ),
    async () => x > 0
  );

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 5);
  await hasNext(it, 4);
  await hasNext(it, 3);
  await hasNext(it, 2);
  await hasNext(it, 1);
  await noNext(it);
});

test('AsyncIterable#whileDo none', async () => {
  let x = 0;
  const res = whileDo(
    defer(async () =>
      of(x).pipe(
        tap({
          next: async () => {
            x--;
          },
        })
      )
    ),
    async () => x > 0
  );

  const it = res[Symbol.asyncIterator]();
  await noNext(it);
});
