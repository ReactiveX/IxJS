import * as Ix from '../Ix';
import * as test from 'tape-async';
const { defer } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;

test('AsyncIterable#defer defers side effects', async (t: test.Test) => {
  let i = 0;
  let n = 5;
  const xs = defer(() => {
    i++;
    return range(0, n);
  });

  t.equal(0, i);

  t.true(await sequenceEqual(xs, range(0, n)));
  t.equal(1, i);

  n = 3;
  t.true(await sequenceEqual(xs, range(0, n)));
  t.equal(2, i);

  t.end();
});
