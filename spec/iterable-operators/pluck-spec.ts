import { hasNext, noNext } from '../iterablehelpers';
import { pluck } from 'ix/iterable/operators';
import { as, of } from 'ix/iterable';

test('Iterable#pluck simple prop', () => {
  const xs = of({ prop: 1 }, { prop: 2 }, { prop: 3 }, { prop: 4 }, { prop: 5 });
  const ys = as(xs).pipe(pluck('prop'));

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  hasNext(it, 5);
  noNext(it);
});

test('Iterable#pluck nested prop', () => {
  const xs = of(
    { a: { b: { c: 1 } } },
    { a: { b: { c: 2 } } },
    { a: { b: { c: 3 } } },
    { a: { b: { c: 4 } } },
    { a: { b: { c: 5 } } }
  );
  const ys = as(xs).pipe(pluck('a', 'b', 'c'));

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  hasNext(it, 5);
  noNext(it);
});

test('Iterable#pluck edge cases', () => {
  const xs = of<any>(
    { a: { b: { c: 1 } } },
    { a: { b: 2 } },
    { a: { c: { c: 3 } } },
    {},
    { a: { b: { c: 5 } } }
  );
  const ys = as(xs).pipe(pluck('a', 'b', 'c'));

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, undefined);
  hasNext(it, undefined);
  hasNext(it, undefined);
  hasNext(it, 5);
  noNext(it);
});
