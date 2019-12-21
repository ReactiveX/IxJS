import '../asynciterablehelpers';
import { of, toArray } from 'ix/asynciterable';
import { flat } from 'ix/asynciterable/operators';

function compareArrays<T>(fst: Iterable<T>, snd: Iterable<T>) {
  expect(fst.toString()).toBe(snd.toString());
}

test('AsyncIterable#flat flattens all', async () => {
  const xs = of<any>(1, of<any>(2, of<any>(3)), 4);
  const ys = await toArray(xs.pipe(flat()));

  compareArrays(ys, [1, 2, 3, 4]);
});

test('AsyncIterable#flat flattens two layers', async () => {
  const xs = of<any>(1, of<any>(2, of<any>(3)), 4);
  const ys = await toArray(xs.pipe(flat(2)));

  compareArrays(ys, [1, 2, 3, 4]);
});
