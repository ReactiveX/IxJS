import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.flatMap]);
const { range } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#flatMap with range', ([flatMap]) => {
  const xs = [1, 2, 3];
  const ys = flatMap(xs, x => range(0, x));

  const it = ys[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 2);
  noNext(it);
});

test('Iterable#flatMap selector returns throw', ([flatMap]) => {
  const err = new Error();
  const xs = [1, 2, 3];
  const ys = flatMap(xs, x => (x < 3 ? range(0, x) : _throw(err)));

  const it = ys[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 0);
  hasNext(it, 1);
  expect(() => it.next()).toThrow();
});

test('Iterable#flatMap with error throws', ([flatMap]) => {
  const err = new Error();
  const xs = _throw<number>(err);
  const ys = flatMap(xs, x => range(0, x));

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#flatMap selector throws error', ([flatMap]) => {
  const err = new Error();
  const xs = [1, 2, 3];
  const ys = flatMap(xs, x => {
    if (x < 3) {
      return range(0, x);
    }
    throw err;
  });

  const it = ys[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 0);
  hasNext(it, 1);
  expect(() => it.next()).toThrow();
});
