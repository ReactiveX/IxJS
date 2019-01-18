import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.scan]);
const { of } = Ix.Iterable;
const { range } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#scan no seed', ([scan]) => {
  const res = scan(range(0, 5), (n, x, i) => n + x + i);

  const it = res[Symbol.iterator]();
  hasNext(it, 2);
  hasNext(it, 6);
  hasNext(it, 12);
  hasNext(it, 20);
  noNext(it);
});

test('Iterable#scan with seed', ([scan]) => {
  const res = scan(range(0, 5), (n, x, i) => n - x - i, 20);

  const it = res[Symbol.iterator]();
  hasNext(it, 20);
  hasNext(it, 18);
  hasNext(it, 14);
  hasNext(it, 8);
  hasNext(it, 0);
  noNext(it);
});

test('AsyncIterable#scan no seed yields the value of single-element sources', ([scan]) => {
  const res = scan(of(0), (n, x, i) => n + x + i);

  const it = res[Symbol.iterator]();
  hasNext(it, 0);
  noNext(it);
});
