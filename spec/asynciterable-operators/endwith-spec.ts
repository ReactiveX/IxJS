import * as Ix from '../Ix';
import * as test from 'tape-async';
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { endWith } = Ix.asynciterable;

test('AsyncIterable#endWith adds to end', async t => {
  const e = range(0, 5);
  const r = endWith(e, 5, 6);
  t.true(await sequenceEqual(r, range(0, 7)));
  t.end();
});
