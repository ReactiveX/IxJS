import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.flatten]);
const { toArray } = Ix.iterable;

function compareArrays<T>(fst: Iterable<T>, snd: Iterable<T>) {
  expect(fst.toString()).toBe(snd.toString());
}

test('Iterable#flatten flattens all', ([flatten]) => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flatten(xs));

  compareArrays(ys, [1, 2, 3, 4]);
});

test('Iterable#flatten flattens two layers', ([flatten]) => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flatten(xs, 2));

  compareArrays(ys, [1, 2, 3, 4]);
});

test('Iterable#flatten flattens one layer', ([flatten]) => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flatten(xs, 1));

  compareArrays(ys, [1, 2, [3], 4]);
});

test('Iterable#flatten flattens no layers', ([flatten]) => {
  const xs = [1, [2, [3]], 4];
  const ys = toArray(flatten(xs, 1));

  compareArrays(ys, [1, [2, [3]], 4]);
});
