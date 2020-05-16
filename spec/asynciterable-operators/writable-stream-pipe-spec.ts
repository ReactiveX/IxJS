import '../asynciterablehelpers';
import { PassThrough } from 'stream';
import { map } from 'ix/asynciterable/operators/index.node';
import { empty, of, sequenceEqual } from 'ix/asynciterable';

// eslint-disable-next-line consistent-return
(() => {
  if (process.env.TEST_NODE_STREAMS !== 'true') {
    return test('not testing node streams because process.env.TEST_NODE_STREAMS !== "true"', () => {
      /**/
    });
  }

  const through = () => {
    return new PassThrough({
      objectMode: true,
      readableObjectMode: true,
      writableObjectMode: true,
    });
  };

  test('AsyncIterable#pipe writable-stream single element', async () => {
    const source = of({ name: 'Frank', custId: 98088 });
    const expected = of('Frank');

    expect(
      await sequenceEqual(expected, map((x: any) => x.name)(source.pipe(through())))
    ).toBeTruthy();
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

    expect(
      await sequenceEqual(expected, map((x: any) => x.name)(source.pipe(through())))
    ).toBeTruthy();
  });

  test('AsyncIterable#pipe writable-stream empty', async () => {
    expect(await sequenceEqual(empty(), map((s: string, i) => s.length + i)(empty()))).toBeTruthy();
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
        map((x: any, i) => (i === 0 ? x.name : null))(source.pipe(through()))
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
        map((x: any, i) => (i === 4 ? x.name : null))(source.pipe(through()))
      )
    ).toBeTruthy();
  });

  test('AsyncIterable#pipe writable-stream execution is deferred', async () => {
    let fnCalled = false;
    const source = of(() => {
      fnCalled = true;
      return 1;
    });

    map((x: any) => x())(source.pipe(through()));

    expect(fnCalled).toBeFalsy();
  });
})();
