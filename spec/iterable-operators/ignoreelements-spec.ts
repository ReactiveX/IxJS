import '../iterablehelpers';
import { range } from 'ix/iterable/index.js';
import { ignoreElements, take, tap } from 'ix/iterable/operators/index.js';

test('Iterable#ignoreElements has side effects', () => {
  let n = 0;

  range(0, 10)
    .pipe(tap({ next: () => n++ }))
    .pipe(ignoreElements())
    .pipe(take(5))
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .forEach(() => {});

  expect(10).toBe(n);
});
