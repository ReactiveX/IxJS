import * as Ix from '../Ix';
const { of } = Ix.Iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#of behavior', () => {
  const res = of(1, 2, 3);

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  noNext(it);
});
