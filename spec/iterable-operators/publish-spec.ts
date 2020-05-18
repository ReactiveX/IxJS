import { hasNext, noNext } from '../iterablehelpers';
import { publish } from 'ix/iterable/operators';
import { concat, range, throwError } from 'ix/iterable';

function* tick(t: (x: number) => void) {
  let i = 0;
  while (1) {
    t(i);
    yield i++;
  }
}

test('Iterable#publish starts at beginning', () => {
  let n = 0;
  const rng = publish()(tick((i) => (n += i)));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();

  hasNext(it1, 0);
  expect(0).toBe(n);

  hasNext(it1, 1);
  expect(1).toBe(n);

  hasNext(it1, 2);
  expect(3).toBe(n);
  hasNext(it2, 0);
  expect(3).toBe(n);

  hasNext(it1, 3);
  expect(6).toBe(n);
  hasNext(it2, 1);
  expect(6).toBe(n);

  hasNext(it2, 2);
  expect(6).toBe(n);
  hasNext(it2, 3);
  expect(6).toBe(n);

  hasNext(it2, 4);
  expect(10).toBe(n);
  hasNext(it1, 4);
  expect(10).toBe(n);
});

test('Iterable#publish single', () => {
  const rng = publish()(range(0, 5));

  const it = rng[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#publish two interleaved', () => {
  const rng = publish()(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();

  hasNext(it1, 0);
  hasNext(it2, 0);
  hasNext(it1, 1);
  hasNext(it2, 1);
  hasNext(it1, 2);
  hasNext(it2, 2);
  hasNext(it1, 3);
  hasNext(it2, 3);
  hasNext(it1, 4);
  hasNext(it2, 4);
  noNext(it1);
  noNext(it2);
});

test('Iterable#publish sequential', () => {
  const rng = publish()(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();

  hasNext(it1, 0);
  hasNext(it1, 1);
  hasNext(it1, 2);
  hasNext(it1, 3);
  hasNext(it1, 4);
  hasNext(it2, 0);
  hasNext(it2, 1);
  hasNext(it2, 2);
  hasNext(it2, 3);
  hasNext(it2, 4);
  noNext(it1);
  noNext(it2);
});

test('Iterable#publish second late', () => {
  const rng = publish()(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  hasNext(it1, 0);
  hasNext(it1, 1);
  hasNext(it1, 2);

  const it2 = rng[Symbol.iterator]();
  hasNext(it1, 3);
  hasNext(it1, 4);
  hasNext(it2, 3);
  hasNext(it2, 4);
  noNext(it1);
  noNext(it2);
});

test('Iterbale#publish shared exceptions', () => {
  const error = new Error();
  const rng = publish()(concat(range(0, 2), throwError(error)));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();

  hasNext(it1, 0);
  hasNext(it1, 1);
  expect(() => it1.next()).toThrow();

  hasNext(it2, 0);
  hasNext(it2, 1);
  expect(() => it2.next()).toThrow();
});
