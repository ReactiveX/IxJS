import * as Ix from '../Ix';
import  * as test  from 'tape';
const { empty } = Ix.iterable;
const { isEmpty } = Ix.iterable;

test('Iterable#isEmpty empty', t => {
  t.true(isEmpty(empty<number>()));
  t.end();
});

test('Iterable#isEmpty not-empty', t => {
  t.false(isEmpty([1]));
  t.end();
});
