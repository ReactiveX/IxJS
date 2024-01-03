import '../iterablehelpers';
import { toArray } from 'ix/iterable/index.js';
import { flat } from 'ix/iterable/operators/index.js';

function compareArrays<T>(fst: Iterable<T>, snd: Iterable<T>) {
  expect(fst.toString()).toBe(snd.toString());
}

test('Iterable#flat flats all', () => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flat()(xs));

  compareArrays(ys, [1, 2, 3, 4]);
});

test('Iterable#flat flats two layers', () => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flat(2)(xs));

  compareArrays(ys, [1, 2, 3, 4]);
});

test('Iterable#flat flats one layer', () => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flat(1)(xs));

  compareArrays(ys, [1, 2, [3], 4]);
});

test('Iterable#flat flats no layers', () => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flat(1)(xs));

  compareArrays(ys, [1, [2, [3]], 4]);
});
