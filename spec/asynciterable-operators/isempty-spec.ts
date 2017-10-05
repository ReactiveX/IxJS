import * as Ix from '../Ix';
import * as test from 'tape-async';
const { empty } = Ix.asynciterable;
const { isEmpty } = Ix.asynciterable;
const { of } = Ix.asynciterable;

test('Iterable#isEmpty empty', async t => {
  t.true(await isEmpty(empty<number>()));
  t.end();
});

test('Iterable#isEmpty not-empty', async t => {
  t.false(await isEmpty(of(1)));
  t.end();
});
