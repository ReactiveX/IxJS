import { defer, of, whileDo } from 'ix/asynciterable';
import { tap } from 'ix/asynciterable/operators';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#while some', async () => {
  let x = 5;
  const res = whileDo(
    async () => x > 0,
    defer(async () =>
      of(x).pipe(
        tap({
          next: async () => {
            x--;
          }
        })
      )
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
  const res = whileDo(
    async () => x > 0,
    defer(async () =>
      of(x).pipe(
        tap({
          next: async () => {
            x--;
          }
        })
      )
    )
  );

  const it = res[Symbol.asyncIterator]();
  await noNext(it);
});
