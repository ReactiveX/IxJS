import * as Ix from '../Ix';
import * as test from 'tape-async';
const { defer } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;

test('Iterable#defer defers side effects', t => {
  let i = 0;
  let n = 5;
  const xs = defer(() => {
    i++;
    return range(0, n);
  });

  t.equal(0, i);

  t.true(sequenceEqual(xs, range(0, n)));
  t.equal(1, i);

  n = 3;
  t.true(sequenceEqual(xs, range(0, n)));
  t.equal(2, i);

  t.end();
});
