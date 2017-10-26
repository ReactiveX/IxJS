import * as Ix from '../Ix';
import * as test from 'tape-async';
const { empty } = Ix.iterable;
const { of } = Ix.Iterable;
const { reduceRight } = Ix.iterable;

test('Iterable#reduceRight no seed', t => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = reduceRight(xs, (x, y, i) => x + y + i);
  t.equal(ys, 16);
  t.end();
});

test('Iterable#reduceRight no seed empty throws', t => {
  const xs = empty<number>();
  t.throws(() => reduceRight(xs, (x, y, i) => x + y + i));
  t.end();
});

test('Iterable#reduceRight with seed', t => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = reduceRight(xs, (x, y, i) => x - y - i, 20);
  t.equal(ys, 0);
  t.end();
});

test('Iterable#reduceRight with seed empty', t => {
  const xs = empty<number>();
  const ys = reduceRight(xs, (x, y, i) => x - y - i, 20);
  t.equal(ys, 20);
  t.end();
});
