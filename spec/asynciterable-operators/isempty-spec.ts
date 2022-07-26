import '../asynciterablehelpers';
import { of, empty, isEmpty } from 'ix/asynciterable';

test('AsyncIterable#isEmpty empty', async () => {
  expect(await isEmpty(empty())).toBeTruthy();
});

test('AsyncIterable#isEmpty not-empty', async () => {
  expect(await isEmpty(of(1))).toBeFalsy();
});
