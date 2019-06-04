import '../asynciterablehelpers';
import { of } from 'ix/asynciterable';
import { PassThrough } from 'stream';
import { map, toDOMStream, toNodeStream } from 'ix/asynciterable/operators/index.node';

const TEST_DOM_STREAMS = toDOMStream && process.env.TEST_DOM_STREAMS === 'true';
const TEST_NODE_STREAMS = toNodeStream && process.env.TEST_NODE_STREAMS === 'true';

describe(`AsyncIterable type inference`, () => {
  test(`#pipe type inference is correct with one operator`, () => {
    const source = of(0, 1, 2).pipe(map(x => x + 1));
    expect(source).toEqualStream([1, 2, 3]);
  });
  test(`#pipe type inference is correct with two operators`, () => {
    const source = of(0, 1, 2).pipe(
      map(x => x + 1),
      map(x => x + 1)
    );
    expect(source).toEqualStream([2, 3, 4]);
  });

  if (TEST_NODE_STREAMS) {
    test(`#pipe type inference is correct with writable stream`, () => {
      const source = of(0, 1, 2).pipe(new PassThrough({ objectMode: true }));
      expect(source).toEqualStream([0, 1, 2]);
    });
    test(`#pipe type inference is correct with writable stream and pipe options`, () => {
      const source = of(0, 1, 2).pipe(
        new PassThrough({ objectMode: true }),
        { end: true }
      );
      expect(source).toEqualStream([0, 1, 2]);
    });
  }

  if (TEST_DOM_STREAMS) {
    test(`#pipeThrough type inference is correct with transform stream`, () => {
      const source = of(0, 1, 2).pipeThrough(new TransformStream());
      expect(source).toEqualStream([0, 1, 2]);
    });
    test(`#pipeThrough type inference is correct with transform stream and pipe options`, () => {
      const source = of(0, 1, 2).pipeThrough(new TransformStream(), {
        preventClose: false
      });
      expect(source).toEqualStream([0, 1, 2]);
    });
  }
});
