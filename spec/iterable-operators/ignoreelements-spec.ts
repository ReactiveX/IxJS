import * as Ix from '../Ix';
import * as test from 'tape-async';
const { forEach } = Ix.iterable;
const { ignoreElements } = Ix.iterable;
const { range } = Ix.iterable;
const { take } = Ix.iterable;
const { tap } = Ix.iterable;

test('Iterable#ignoreElements has side effects', t => {
  let n = 0;
  forEach(
    take(ignoreElements(tap(range(0, 10), { next: () => n++})), 5),
    () => { /* tslint:disable-next-line:no-empty */ }
  );

  t.equal(10, n);
  t.end();
});
