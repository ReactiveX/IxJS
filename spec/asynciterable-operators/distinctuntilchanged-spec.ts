import * as Ix from '../Ix';
import * as test from 'tape-async';
const { distinctUntilChanged } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.asynciterable;

test('Iterable#distinctUntilChanged no selector', async t => {
  const res = distinctUntilChanged(of(1, 2, 2, 3, 3, 3, 2, 2, 1));
  t.true(await sequenceEqual(res, of(1, 2, 3, 2, 1)));
  t.end();
});

test('Iterable#distinctUntilChanged with selector', async t => {
  const res = distinctUntilChanged(of(1, 1, 2, 3, 4, 5, 5, 6, 7), x => Math.floor(x / 2));
  t.true(await sequenceEqual(res, of(1, 2, 4, 6)));
  t.end();
});
