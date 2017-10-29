import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.pluck]);
const { of } = Ix.AsyncIterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('Iterable#pluck simple prop', async (t, [pluck]) => {
  const xs = of({ prop: 1 }, { prop: 2 }, { prop: 3 }, { prop: 4 }, { prop: 5 });
  const ys = pluck(xs, 'prop');

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await hasNext(t, it, 5);
  await noNext(t, it);
  t.end();
});

test('Iterable#pluck nested prop', async (t, [pluck]) => {
  const xs = of(
    { a: { b: { c: 1 } } },
    { a: { b: { c: 2 } } },
    { a: { b: { c: 3 } } },
    { a: { b: { c: 4 } } },
    { a: { b: { c: 5 } } }
  );
  const ys = pluck(xs, 'a', 'b', 'c');

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await hasNext(t, it, 5);
  await noNext(t, it);
  t.end();
});

test('Iterable#pluck edge cases', async (t, [pluck]) => {
  const xs = of<any>(
    { a: { b: { c: 1 } } },
    { a: { b: 2 } },
    { a: { c: { c: 3 } } },
    {},
    { a: { b: { c: 5 } } }
  );
  const ys = pluck(xs, 'a', 'b', 'c');

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, undefined);
  await hasNext(t, it, undefined);
  await hasNext(t, it, undefined);
  await hasNext(t, it, 5);
  await noNext(t, it);
  t.end();
});
