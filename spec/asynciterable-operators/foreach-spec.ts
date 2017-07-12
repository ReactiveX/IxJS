import * as Ix from '../Ix';
import  * as test  from 'tape';
const { forEach } = Ix.asynciterable;
const { range } = Ix.asynciterable;

test('AsyncIterable#forEach', async t => {
  let n = 0;

  await forEach(range(5, 3), async x => { n += x; });

  t.equal(5 + 6 + 7, n);
  t.end();
});

test('AsyncIterable#forEach with index', async t => {
  let n = 0;

  await forEach(range(5, 3), async (x, i) => { n += x * i; });

  t.equal(5 * 0 + 6 * 1 + 7 * 2, n);
  t.end();
});
