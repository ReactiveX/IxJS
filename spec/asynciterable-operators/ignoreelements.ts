import { range } from 'ix/asynciterable';
import { ignoreElements, take, tap } from 'ix/asynciterable/operators';

test('Iterable#ignoreElements has side effects', async () => {
  let n = 0;
  await range(0, 10)
    .pipe(
      tap({
        next: async () => {
          n++;
        }
      }),
      ignoreElements(),
      take(5)
    )
    .forEach(async () => {
      /* tslint:disable-next-line:no-empty */
    });

  expect(n).toBe(10);
});
