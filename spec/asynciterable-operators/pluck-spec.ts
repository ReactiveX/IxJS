import { of } from 'ix/asynciterable';
import { pluck } from 'ix/asynciterable/operators';
import { hasNext, noNext } from '../asynciterablehelpers';

test('Iterable#pluck simple prop', async () => {
  const xs = of({ prop: 1 }, { prop: 2 }, { prop: 3 }, { prop: 4 }, { prop: 5 });
  const ys = xs.pipe(pluck('prop'));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await hasNext(it, 5);
  await noNext(it);
});

test('Iterable#pluck nested prop', async () => {
  const xs = of(
    { a: { b: { c: 1 } } },
    { a: { b: { c: 2 } } },
    { a: { b: { c: 3 } } },
    { a: { b: { c: 4 } } },
    { a: { b: { c: 5 } } }
  );
  const ys = xs.pipe(pluck('a', 'b', 'c'));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await hasNext(it, 5);
  await noNext(it);
});

test('Iterable#pluck edge cases', async () => {
  const xs = of<any>(
    { a: { b: { c: 1 } } },
    { a: { b: 2 } },
    { a: { c: { c: 3 } } },
    {},
    { a: { b: { c: 5 } } }
  );
  const ys = xs.pipe(pluck('a', 'b', 'c'));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, undefined);
  await hasNext(it, undefined);
  await hasNext(it, undefined);
  await hasNext(it, 5);
  await noNext(it);
});
