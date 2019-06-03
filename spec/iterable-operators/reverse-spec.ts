import { hasNext, noNext } from '../iterablehelpers';
import { empty, throwError } from 'ix/iterable';
import { reverse } from 'ix/iterable/operators';

test('Iterable#reverse empty', () => {
  const xs = empty<number>();
  const ys = reverse()(xs);

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Iterable#revrse single element', () => {
  const xs = [42];
  const ys = reverse()(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 42);
  noNext(it);
});

test('Iterable#reverse multiple elements', () => {
  const xs = [1, 2, 3];
  const ys = reverse()(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 3);
  hasNext(it, 2);
  hasNext(it, 1);
  noNext(it);
});

test('Iterable#reverse throws', () => {
  const xs = throwError<number>(new Error());
  const ys = reverse()(xs);

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
