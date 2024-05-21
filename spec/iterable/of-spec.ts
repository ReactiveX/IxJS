import { hasNext, noNext } from '../iterablehelpers.js';
import { of } from 'ix/iterable/index.js';

test('Iterable#of behavior', () => {
  const res = of(1, 2, 3);

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  noNext(it);
});
