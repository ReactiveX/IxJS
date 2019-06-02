import { defer, sequenceEqual, toArray, whileDo } from 'ix/iterable';
import { tap } from 'ix/iterable/operators';

test('Iterable#while some', () => {
  let x = 5;
  const res = toArray(whileDo(() => x > 0, defer(() => tap({ next: () => x-- })([x]))));

  expect(sequenceEqual(res, [5, 4, 3, 2, 1])).toBeTruthy();
});

test('Iterable#while none', () => {
  let x = 0;
  const res = toArray(whileDo(() => x > 0, defer(() => tap({ next: () => x-- })([x]))));

  expect(sequenceEqual(res, [])).toBeTruthy();
});
