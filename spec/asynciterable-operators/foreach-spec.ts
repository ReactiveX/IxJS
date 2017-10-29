import * as Ix from '../Ix';
import * as test from 'tape';
const { range } = Ix.asynciterable;

test('AsyncIterable#forEach', async t => {
  let n = 0;

  await range(5, 3).forEach(async x => {
    n += x;
  });

  t.equal(5 + 6 + 7, n);
  t.end();
});

test('AsyncIterable#forEach with index', async t => {
  let n = 0;

  await range(5, 3).forEach(async (x, i) => {
    n += x * i;
  });

  t.equal(5 * 0 + 6 * 1 + 7 * 2, n);
  t.end();
});
