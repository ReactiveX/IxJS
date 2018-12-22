import * as Ix from '../Ix';
const { ofValues } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#ofValues behavior', () => {
  const xs = { first: 'Bob', last: 'Smith' };
  const ys = ofValues(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 'Bob');
  hasNext(it, 'Smith');
  noNext(it);
});
