import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.reverse]);
const { empty } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#reverse empty', ([reverse]) => {
  const xs = empty<number>();
  const ys = reverse(xs);

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Iterable#revrse single element', ([reverse]) => {
  const xs = [42];
  const ys = reverse(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 42);
  noNext(it);
});

test('Iterable#reverse multiple elements', ([reverse]) => {
  const xs = [1, 2, 3];
  const ys = reverse(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 3);
  hasNext(it, 2);
  hasNext(it, 1);
  noNext(it);
});

test('Iterable#reverse throws', ([reverse]) => {
  const xs = _throw<number>(new Error());
  const ys = reverse(xs);

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
