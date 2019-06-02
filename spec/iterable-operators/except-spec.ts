import { except } from 'ix/iterable/operators';
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#except with default comparer', () => {
  const xs = [1, 2, 3];
  const ys = [3, 5, 1, 4];
  const res = except(ys)(xs);

  const it = res[Symbol.iterator]();
  hasNext(it, 2);
  noNext(it);
});

test('Iterable#except with custom comparer', () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, -3];
  const ys = [3, 5, -1, 4];
  const res = except(ys, comparer)(xs);

  const it = res[Symbol.iterator]();
  hasNext(it, 2);
  noNext(it);
});
