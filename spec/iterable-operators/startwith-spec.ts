import * as Ix from '../Ix';
import * as test from 'tape-async';
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { startWith } = Ix.iterable;
const { take } = Ix.iterable;
const { tap } = Ix.iterable;
const { toArray } = Ix.iterable;

test('Iterable#startWith adds to beginning', t => {
  const e = range(1, 5);
  const r = startWith(e, 0);
  t.true(sequenceEqual(r, range(0, 6)));
  t.end();
});

test('Iterable#startWith adds without causing effects', t => {
  let oops = false;
  const e = tap(range(1, 5), { next: () => oops = true });
  toArray(take(startWith(e, 0), 1));
  t.false(oops);
  t.end();
});
