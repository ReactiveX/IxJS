import * as Ix from '../Ix';
import * as test from 'tape-async';
const { empty } = Ix.asynciterable;
import { noNext } from '../asynciterablehelpers';

test('AsyncIterable#empty empty', async (t: test.Test) => {
  const xs = empty<number>();

  const it = xs[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});
