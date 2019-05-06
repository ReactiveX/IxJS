import { empty } from 'ix/iterable';
import { noNext } from '../iterablehelpers';

test('Iterable#empty empty', () => {
  const xs = empty<number>();

  const it = xs[Symbol.iterator]();
  noNext(it);
});
