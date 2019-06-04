import '../iterablehelpers';
import { range } from 'ix/iterable';
import { ignoreElements, take, tap } from 'ix/iterable/operators';

test('Iterable#ignoreElements has side effects', () => {
  let n = 0;

  range(0, 10)
    .pipe(tap({ next: () => n++ }))
    .pipe(ignoreElements())
    .pipe(take(5))
    .forEach(() => {
      /* tslint:disable-next-line:no-empty */
    });

  expect(10).toBe(n);
});
