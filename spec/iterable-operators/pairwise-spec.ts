import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.pairwise]);
const { empty } = Ix.iterable;
const { of } = Ix.Iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#pairwise empty return empty', ([pairwise]) => {
  const xs = empty<number>();
  const ys = pairwise(xs);

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Iterable#pairwise single returns empty', ([pairwise]) => {
  const xs = of(5);
  const ys = pairwise(xs);

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Iterable#pairwise behavior', ([pairwise]) => {
  const xs = of(5, 4, 3, 2, 1);
  const ys = pairwise(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, [5, 4]);
  hasNext(it, [4, 3]);
  hasNext(it, [3, 2]);
  hasNext(it, [2, 1]);
  noNext(it);
});
