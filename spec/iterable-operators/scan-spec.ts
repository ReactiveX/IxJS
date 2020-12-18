import { hasNext, noNext } from '../iterablehelpers';
import { scan } from 'ix/iterable/operators';
import { of, range } from 'ix/iterable';

test('Iterable#scan no seed', () => {
  const res = range(0, 5).pipe(scan({ callback: (n, x, i) => n + x + i }));

  const it = res[Symbol.iterator]();
  hasNext(it, 2);
  hasNext(it, 6);
  hasNext(it, 12);
  hasNext(it, 20);
  noNext(it);
});

test('Iterable#scan no seed Array signature', () => {
  const res = range(0, 5).pipe(scan((n, x, i) => n + x + i));

  const it = res[Symbol.iterator]();
  hasNext(it, 2);
  hasNext(it, 6);
  hasNext(it, 12);
  hasNext(it, 20);
  noNext(it);
});

test('Iterable#scan with seed', () => {
  const res = range(0, 5).pipe(scan({ callback: (n, x, i) => n - x - i, seed: 20 }));

  const it = res[Symbol.iterator]();
  hasNext(it, 20);
  hasNext(it, 18);
  hasNext(it, 14);
  hasNext(it, 8);
  hasNext(it, 0);
  noNext(it);
});

test('Iterable#scan with seed Array signature', () => {
  const res = range(0, 5).pipe(scan((n, x, i) => n - x - i, 20));

  const it = res[Symbol.iterator]();
  hasNext(it, 20);
  hasNext(it, 18);
  hasNext(it, 14);
  hasNext(it, 8);
  hasNext(it, 0);
  noNext(it);
});

test('AsyncIterable#scan no seed yields the value of single-element sources', () => {
  const res = of(0).pipe(scan({ callback: (n, x, i) => n + x + i }));

  const it = res[Symbol.iterator]();
  hasNext(it, 0);
  noNext(it);
});
