import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.defaultIfEmpty]);
const { empty } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#defaultIfEmpty with empty', (t, [defaultIfEmpty]) => {
  const xs = empty<number>();
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 0);
  noNext(t, it);
  t.end();
});

test('Iterable#defaultIfEmpty with no empty', (t, [defaultIfEmpty]) => {
  const xs = [42];
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 42);
  noNext(t, it);
  t.end();
});

test('Iterable#defaultIfEmpty throws', (t, [defaultIfEmpty]) => {
  const xs = _throw<number>(new Error());
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});
