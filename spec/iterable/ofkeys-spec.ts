import * as Ix from '../Ix';
const { ofKeys } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#ofValues behavior', () => {
  const xs = { first: 'Bob', last: 'Smith' };
  const ys = ofKeys(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 'first');
  hasNext(it, 'last');
  noNext(it);
});
