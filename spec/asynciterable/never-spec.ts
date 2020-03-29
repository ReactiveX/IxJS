import { never } from 'ix/asynciterable';

test('AsyncIterable#of never', async () => {
  let called = false;
  const res = never();

  const it = res[Symbol.asyncIterator]();
  it.next().then(() => {
    called = true;
  });

  expect(called).toBeFalsy();
});
