import '../asynciterablehelpers';
import { of, empty, isEmpty } from 'ix/asynciterable';

test('Iterable#isEmpty empty', async () => {
  expect(await isEmpty(empty())).toBeTruthy();
});

test('Iterable#isEmpty not-empty', async () => {
  expect(await isEmpty(of(1))).toBeFalsy();
});
