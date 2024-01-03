import '../asynciterablehelpers.js';
import { range, sequenceEqual, toArray } from 'ix/asynciterable/index.js';
import { startWith, take, tap } from 'ix/asynciterable/operators/index.js';

test('AsyncIterable#startWith adds to beginning', async () => {
  const e = range(1, 5);
  const r = e.pipe(startWith(0));
  expect(await sequenceEqual(r, range(0, 6))).toBeTruthy();
});

test('AsyncIterable#startWith adds without causing effects', async () => {
  let oops = false;
  const e = range(1, 5).pipe(
    tap({
      next: async () => {
        oops = true;
      },
    })
  );
  await toArray(e.pipe(startWith(0), take(1)));
  expect(oops).toBeFalsy();
});
