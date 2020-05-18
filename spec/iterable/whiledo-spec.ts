import '../iterablehelpers';
import { tap } from 'ix/iterable/operators';
import { defer, sequenceEqual, toArray, whileDo } from 'ix/iterable';

test('Iterable#while some', () => {
  let x = 5;
  const res = toArray(
    whileDo(
      defer(() => tap({ next: () => x-- })([x])),
      () => x > 0
    )
  );

  expect(sequenceEqual(res, [5, 4, 3, 2, 1])).toBeTruthy();
});

test('Iterable#while none', () => {
  let x = 0;
  const res = toArray(
    whileDo(
      defer(() => tap({ next: () => x-- })([x])),
      () => x > 0
    )
  );

  expect(sequenceEqual(res, [])).toBeTruthy();
});
