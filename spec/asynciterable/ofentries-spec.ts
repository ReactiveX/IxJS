import * as Ix from '../Ix';
const { ofEntries } = Ix.asynciterable;
import { noNext } from '../asynciterablehelpers';

test('AsyncIterable#ofEntries behavior', async () => {
  const xs = { first: 'Bob', last: 'Smith' };
  const ys = ofEntries(xs);

  const it = ys[Symbol.asyncIterator]();
  let next = await it.next();
  expect(next.done).toBeFalsy();
  expect(next.value[0]).toBe('first');
  expect(next.value[1]).toBe('Bob');
  next = await it.next();
  expect(next.done).toBeFalsy();
  expect(next.value[0]).toBe('last');
  expect(next.value[1]).toBe('Smith');
  await noNext(it);
});
