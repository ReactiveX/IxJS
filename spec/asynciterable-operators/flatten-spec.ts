import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.flatten]);
const { of } = Ix.AsyncIterable;
const { toArray } = Ix.asynciterable;

function compareArrays<T>(fst: Iterable<T>, snd: Iterable<T>) {
  expect(fst.toString()).toBe(snd.toString());
}

test('AsyncIterable#flatten flattens all', async ([flatten]) => {
  const xs = of<any>(1, of<any>(2, of<any>(3)), 4);
  const ys = await toArray(flatten(xs));

  compareArrays(ys, [1, 2, 3, 4]);
});

test('AsyncIterable#flatten flattens two layers', async ([flatten]) => {
  const xs = of<any>(1, of<any>(2, of<any>(3)), 4);
  const ys = await toArray(flatten(xs, 2));

  compareArrays(ys, [1, 2, 3, 4]);
});
