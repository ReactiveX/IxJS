import * as Ix from '../Ix';
const { empty } = Ix.iterable;
import { noNext } from '../iterablehelpers';

test('Iterable#empty empty', () => {
  const xs = empty<number>();

  const it = xs[Symbol.iterator]();
  noNext(it);
});
