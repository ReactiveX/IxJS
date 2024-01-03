import '../asynciterablehelpers.js';
import { of, empty, isEmpty } from 'ix/asynciterable/index.js';

test('AsyncIterable#isEmpty empty', async () => {
  expect(await isEmpty(empty())).toBeTruthy();
});

test('AsyncIterable#isEmpty not-empty', async () => {
  expect(await isEmpty(of(1))).toBeFalsy();
});
