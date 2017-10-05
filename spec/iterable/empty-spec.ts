import * as Ix from '../Ix';
import * as test from 'tape-async';
const { empty } = Ix.iterable;
import { noNext } from '../iterablehelpers';

test('Iterable#empty empty', t => {
  const xs = empty<number>();

  const it = xs[Symbol.iterator]();
  noNext(t, it);
  t.end();
});
