import * as Ix from '../Ix';
const { ofEntries } = Ix.iterable;
import { noNext } from '../iterablehelpers';

test('Iterable#ofEntries behavior', () => {
  const xs = { first: 'Bob', last: 'Smith' };
  const ys = ofEntries(xs);

  const it = ys[Symbol.iterator]();
  let next = it.next();
  expect(next.done).toBeFalsy();
  expect(next.value[0]).toBe('first');
  expect(next.value[1]).toBe('Bob');
  next = it.next();
  expect(next.done).toBeFalsy();
  expect(next.value[0]).toBe('last');
  expect(next.value[1]).toBe('Smith');
  noNext(it);
});
