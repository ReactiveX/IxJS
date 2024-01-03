import '../asynciterablehelpers.js';
import { of, toArray } from 'ix/asynciterable/index.js';
import { flat } from 'ix/asynciterable/operators/index.js';

function compareArrays<T>(fst: Iterable<T>, snd: Iterable<T>) {
  expect(fst.toString()).toBe(snd.toString());
}

test('AsyncIterable#flat flattens all layers', async () => {
  const xs = of(1, of(2, of(3)), 4);
  const ys = await toArray(xs.pipe(flat()));

  compareArrays(ys, [1, 4, 2, 3]);
});

test('AsyncIterable#flat flattens all layers with concurrent = 1', async () => {
  const xs = of(1, of(2, of(3)), 4);
  const ys = await toArray(xs.pipe(flat(-1, 1)));

  compareArrays(ys, [1, 2, 3, 4]);
});

test('AsyncIterable#flat flattens two layers', async () => {
  const xs = of(1, of(2, of(3)), 4);
  const ys = await toArray(xs.pipe(flat(2)));

  compareArrays(ys, [1, 4, 2, 3]);
});
