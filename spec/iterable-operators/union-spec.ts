import { hasNext, noNext } from '../iterablehelpers';
import { union } from 'ix/iterable/operators';

test('Iterable#union with default comparer', () => {
  const xs = [1, 2, 3];
  const ys = [3, 5, 1, 4];
  const res = union(ys)(xs);

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 5);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#union with custom comparer', () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, -3];
  const ys = [3, 5, -1, 4];
  const res = union(ys, comparer)(xs);

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, -3);
  hasNext(it, 5);
  hasNext(it, 4);
  noNext(it);
});
