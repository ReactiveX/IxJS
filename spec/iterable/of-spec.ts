import * as Ix from '../Ix';
import * as test from 'tape';
const { of } = Ix.Iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#of behavior', t => {
  const res = of(1, 2, 3);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  noNext(t, it);
  t.end();
});
