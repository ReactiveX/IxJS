import * as Ix from '../Ix';
import * as test from 'tape';
const { forEach } = Ix.asynciterable;
const { ignoreElements } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { take } = Ix.asynciterable;
const { tap } = Ix.asynciterable;

test('Iterable#ignoreElements has side effects', async t => {
  let n = 0;
  await forEach(
    take(ignoreElements(tap(range(0, 10), { next: async () => { n++; } })), 5),
    async () => { /* tslint:disable-next-line:no-empty */ }
  );

  t.equal(10, n);
  t.end();
});
