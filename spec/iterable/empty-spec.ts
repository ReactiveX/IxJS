import { noNext } from '../iterablehelpers.js';
import { empty } from 'ix/iterable/index.js';

test('Iterable#empty empty', () => {
  const xs = empty();

  const it = xs[Symbol.iterator]();
  noNext(it);
});
