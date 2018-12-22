import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.pluck]);
const { of } = Ix.Iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#pluck simple prop', ([pluck]) => {
  const xs = of({ prop: 1 }, { prop: 2 }, { prop: 3 }, { prop: 4 }, { prop: 5 });
  const ys = pluck(xs, 'prop');

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  hasNext(it, 5);
  noNext(it);
});

test('Iterable#pluck nested prop', ([pluck]) => {
  const xs = of(
    { a: { b: { c: 1 } } },
    { a: { b: { c: 2 } } },
    { a: { b: { c: 3 } } },
    { a: { b: { c: 4 } } },
    { a: { b: { c: 5 } } }
  );
  const ys = pluck(xs, 'a', 'b', 'c');

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  hasNext(it, 5);
  noNext(it);
});

test('Iterable#pluck edge cases', ([pluck]) => {
  const xs = of<any>(
    { a: { b: { c: 1 } } },
    { a: { b: 2 } },
    { a: { c: { c: 3 } } },
    {},
    { a: { b: { c: 5 } } }
  );
  const ys = pluck(xs, 'a', 'b', 'c');

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, undefined);
  hasNext(it, undefined);
  hasNext(it, undefined);
  hasNext(it, 5);
  noNext(it);
});
