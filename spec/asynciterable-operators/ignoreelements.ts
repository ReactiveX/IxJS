import * as Ix from '../Ix';
import * as test from 'tape-async';
const { ignoreElements } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { take } = Ix.asynciterable;
const { tap } = Ix.asynciterable;

test('Iterable#ignoreElements has side effects', async t => {
  let n = 0;
  await take(
    ignoreElements(
      tap(range(0, 10), {
        next: async () => {
          n++;
        }
      })
    ),
    5
  ).forEach(async () => {
    /* tslint:disable-next-line:no-empty */
  });

  t.equal(10, n);
  t.end();
});
