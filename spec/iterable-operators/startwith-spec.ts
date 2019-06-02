import { take, tap, startWith } from 'ix/iterable/operators';
import { range, sequenceEqual, toArray } from 'ix/iterable';

test('Iterable#startWith adds to beginning', () => {
  const e = range(1, 5);
  const r = e.pipe(startWith(0));
  expect(sequenceEqual(r, range(0, 6))).toBeTruthy();
});

test('Iterable#startWith adds without causing effects', () => {
  let oops = false;
  const e = range(1, 5).pipe(tap({ next: () => (oops = true) }));
  e.pipe(startWith(0))
    .pipe(take(1))
    .pipe(toArray);
  expect(oops).toBeFalsy();
});
