import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.doWhile]);
const { defer } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.iterable;
const { tap } = Ix.asynciterable;
const { toArray } = Ix.asynciterable;

test('Iterable#doWhile some', async (t, [doWhile]) => {
  let x = 5;
  const res = await toArray(
    doWhile(
      defer(() =>
        tap(of(x), {
          next: async () => {
            x--;
          }
        })
      ),
      async () => x > 0
    )
  );

  t.true(sequenceEqual(res, [5, 4, 3, 2, 1]));
  t.end();
});

test('Iterable#doWhile one', async (t, [doWhile]) => {
  let x = 0;
  const res = await toArray(
    doWhile(
      defer(() =>
        tap(of(x), {
          next: async () => {
            x--;
          }
        })
      ),
      async () => x > 0
    )
  );

  t.true(sequenceEqual(res, [0]));
  t.end();
});
