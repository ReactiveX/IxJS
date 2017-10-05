import * as Ix from '../Ix';
import * as test from 'tape-async';
const { ofKeys } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#ofValues behavior', t => {
  const xs = { first: 'Bob', last: 'Smith' };
  const ys = ofKeys(xs);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 'first');
  hasNext(t, it, 'last');
  noNext(t, it);
  t.end();
});
