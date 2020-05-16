import { noNext } from '../iterablehelpers';
import { empty } from 'ix/iterable';

test('Iterable#empty empty', () => {
  const xs = empty();

  const it = xs[Symbol.iterator]();
  noNext(it);
});
