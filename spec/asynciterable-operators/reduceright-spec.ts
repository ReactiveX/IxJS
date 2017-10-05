import * as Ix from '../Ix';
import * as test from 'tape-async';
const { empty } = Ix.asynciterable;
const { of } = Ix.asynciterable;
const { reduceRight } = Ix.asynciterable;

test('AsyncIterable#reduceRight no seed', async t => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = await reduceRight(xs, (x, y, i) => x + y + i);
  t.equal(ys, 16);
  t.end();
});

test('AsyncIterable#reduceRight no seed empty throws', async t => {
  const xs = empty<number>();
  try {
    await reduceRight(xs, (x, y, i) => x + y + i);
  } catch (e) {
    t.assert(e !== null);
  }
  t.end();
});

test('AsyncIterable#reduceRight with seed', async t => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = await reduceRight(xs, (x, y, i) => x - y - i, 20);
  t.equal(ys, 0);
  t.end();
});

test('AsyncIterable#reduceRight with seed empty', async t => {
  const xs = empty<number>();
  const ys = await reduceRight(xs, (x, y, i) => x - y - i, 20);
  t.equal(ys, 20);
  t.end();
});
