import * as Ix from '../Ix';
import '../asynciterablehelpers';
import { PassThrough } from 'stream';

const { AsyncIterable, asynciterablePipe: op } = Ix;
const TEST_DOM_STREAMS = process.env.TEST_DOM_STREAMS === 'true';
const TEST_NODE_STREAMS = process.env.TEST_NODE_STREAMS === 'true';

describe(`AsyncIterable type inference`, () => {
  test(`#pipe type inference is correct with one operator`, () => {
    const source = AsyncIterable.of(0, 1, 2).pipe(op.map(x => x + 1));
    expect(source).toEqualStream([1, 2, 3]);
  });
  test(`#pipe type inference is correct with two operators`, () => {
    const source = AsyncIterable.of(0, 1, 2).pipe(
      op.map(x => x + 1),
      op.map(x => x + 1)
    );
    expect(source).toEqualStream([2, 3, 4]);
  });

  if (TEST_NODE_STREAMS) {
    test(`#pipe type inference is correct with writable stream`, () => {
      const source = AsyncIterable.of(0, 1, 2).pipe(new PassThrough({ objectMode: true }));
      expect(source).toEqualStream([0, 1, 2]);
    });
    test(`#pipe type inference is correct with writable stream and pipe options`, () => {
      const source = AsyncIterable.of(0, 1, 2).pipe(
        new PassThrough({ objectMode: true }),
        { end: true }
      );
      expect(source).toEqualStream([0, 1, 2]);
    });
  }

  if (TEST_DOM_STREAMS) {
    test(`#pipeThrough type inference is correct with transform stream`, () => {
      const source = AsyncIterable.of(0, 1, 2).pipeThrough(new TransformStream());
      expect(source).toEqualStream([0, 1, 2]);
    });
    test(`#pipeThrough type inference is correct with transform stream and pipe options`, () => {
      const source = AsyncIterable.of(0, 1, 2).pipeThrough(new TransformStream(), {
        preventClose: false
      });
      expect(source).toEqualStream([0, 1, 2]);
    });
  }
});
