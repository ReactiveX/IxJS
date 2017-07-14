import * as Ix from '../Ix';
import * as test from 'tape';
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { startWith } = Ix.asynciterable;
const { take } = Ix.asynciterable;
const { tap } = Ix.asynciterable;
const { toArray } = Ix.asynciterable;

test('AsyncIterable#startWith adds to beginning', async t => {
  const e = range(1, 5);
  const r = startWith(e, 0);
  t.true(await sequenceEqual(r, range(0, 6)));
  t.end();
});

test('AsyncIterable#startWith adds without causing effects', async t => {
  let oops = false;
  const e = tap(range(1, 5), { next: async () => { oops = true; } });
  await toArray(take(startWith(e, 0), 1));
  t.false(oops);
  t.end();
});
