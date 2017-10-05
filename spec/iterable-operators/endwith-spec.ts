import * as Ix from '../Ix';
import * as test from 'tape';
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { endWith } = Ix.iterable;

test('Iterable#endWith adds to end', t => {
  const e = range(0, 5);
  const r = endWith(e, 5, 6);
  t.true(sequenceEqual(r, range(0, 7)));
  t.end();
});
