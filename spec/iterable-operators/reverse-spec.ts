import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.reverse]);
const { empty } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#reverse empty', (t, [reverse]) => {
  const xs = empty<number>();
  const ys = reverse(xs);

  const it = ys[Symbol.iterator]();
  noNext(t, it);
  t.end();
});

test('Iterable#revrse single element', (t, [reverse]) => {
  const xs = [42];
  const ys = reverse(xs);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 42);
  noNext(t, it);
  t.end();
});

test('Iterable#reverse multiple elements', (t, [reverse]) => {
  const xs = [1, 2, 3];
  const ys = reverse(xs);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 3);
  hasNext(t, it, 2);
  hasNext(t, it, 1);
  noNext(t, it);
  t.end();
});

test('Iterable#reverse throws', (t, [reverse]) => {
  const xs = _throw<number>(new Error());
  const ys = reverse(xs);

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});
