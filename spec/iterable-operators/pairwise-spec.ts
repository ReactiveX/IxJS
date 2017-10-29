import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.pairwise]);
const { empty } = Ix.iterable;
const { of } = Ix.Iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#pairwise empty return empty', (t, [pairwise]) => {
  const xs = empty<number>();
  const ys = pairwise(xs);

  const it = ys[Symbol.iterator]();
  noNext(t, it);
  t.end();
});

test('Iterable#pairwise single returns empty', (t, [pairwise]) => {
  const xs = of(5);
  const ys = pairwise(xs);

  const it = ys[Symbol.iterator]();
  noNext(t, it);
  t.end();
});

test('Iterable#pairwise behavior', (t, [pairwise]) => {
  const xs = of(5, 4, 3, 2, 1);
  const ys = pairwise(xs);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, [5, 4]);
  hasNext(t, it, [4, 3]);
  hasNext(t, it, [3, 2]);
  hasNext(t, it, [2, 1]);
  noNext(t, it);
  t.end();
});
