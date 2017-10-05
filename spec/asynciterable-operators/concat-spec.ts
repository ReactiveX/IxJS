import * as Ix from '../Ix';
import * as test from 'tape-async';
const { concat } = Ix.asynciterable;
const { concatAll } = Ix.asynciterable;
const { map } = Ix.asynciterable;
const { of } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { tap } = Ix.asynciterable;

test('AsyncIterable#concat concatAll behavior', async t => {
  const res = concatAll(of(of(1, 2, 3), of(4, 5)));
  t.true(await sequenceEqual(res, of(1, 2, 3, 4, 5)));
  t.end();
});

test('Iterable#concat concatAll order of effects', async t => {
  let i = 0;
  const xss = tap(map(range(0, 3), x => range(0, x + 1)), { next: async () => { ++i; } });
  const res = map(concatAll(xss), x => i + ' - ' + x);

  t.true(await sequenceEqual(res, of(
    '1 - 0',
    '2 - 0',
    '2 - 1',
    '3 - 0',
    '3 - 1',
    '3 - 2'
  )));
  t.end();
});

test('AsyncIterable#concat behavior', async t => {
  const res = concat(of(1, 2, 3), of(4, 5));
  t.true(await sequenceEqual(res, of(1, 2, 3, 4, 5)));
  t.end();
});
