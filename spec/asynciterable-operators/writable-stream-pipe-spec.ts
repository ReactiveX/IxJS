import * as Ix from '../Ix';
import { PassThrough } from 'stream';

(() => {
  if (process.env.TEST_NODE_STREAMS !== 'true') {
    return test('not testing node streams because process.env.TEST_NODE_STREAMS !== "true"', () => {
      /**/
    });
  }

  const { of } = Ix.AsyncIterable;
  const { empty, map } = Ix.asynciterable;
  const { sequenceEqual } = Ix.asynciterable;
  const through = () => {
    return new PassThrough({
      objectMode: true,
      readableObjectMode: true,
      writableObjectMode: true
    });
  };

  test('AsyncIterable#pipe writable-stream single element', async () => {
    const source = of({ name: 'Frank', custId: 98088 });
    const expected = of('Frank');

    expect(await sequenceEqual(expected, map(source.pipe(through()), x => x.name))).toBeTruthy();
  });

  test('AsyncIterable#pipe writable-stream maps property', async () => {
    const source = of<any>(
      { name: 'Frank', custId: 98088 },
      { name: 'Bob', custId: 29099 },
      { name: 'Chris', custId: 39033 },
      { name: null, custId: 30349 },
      { name: 'Frank', custId: 39030 }
    );
    const expected = of('Frank', 'Bob', 'Chris', null, 'Frank');

    expect(await sequenceEqual(expected, map(source.pipe(through()), x => x.name))).toBeTruthy();
  });

  test('AsyncIterable#pipe writable-stream empty', async () => {
    expect(
      await sequenceEqual(empty<number>(), map(empty<string>(), (s, i) => s.length + i))
    ).toBeTruthy();
  });

  test('AsyncIterable#pipe writable-stream map property using index', async () => {
    const source = of(
      { name: 'Frank', custId: 98088 },
      { name: 'Bob', custId: 29099 },
      { name: 'Chris', custId: 39033 }
    );
    const expected = of('Frank', null, null);

    expect(
      await sequenceEqual(
        expected,
        map(source.pipe(through()), (x, i) => (i === 0 ? x.name : null))
      )
    ).toBeTruthy();
  });

  test('AsyncIterable#pipe writable-stream map property using index on last', async () => {
    const source = of(
      { name: 'Frank', custId: 98088 },
      { name: 'Bob', custId: 29099 },
      { name: 'Chris', custId: 39033 },
      { name: 'Bill', custId: 30349 },
      { name: 'Frank', custId: 39030 }
    );
    const expected = of(null, null, null, null, 'Frank');

    expect(
      await sequenceEqual(
        expected,
        map(source.pipe(through()), (x, i) => (i === 4 ? x.name : null))
      )
    ).toBeTruthy();
  });

  test('AsyncIterable#pipe writable-stream execution is deferred', async () => {
    let fnCalled = false;
    const source = of(() => {
      fnCalled = true;
      return 1;
    });

    map(source.pipe(through()), x => x());

    expect(fnCalled).toBeFalsy();
  });
})();
