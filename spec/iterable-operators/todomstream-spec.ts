import * as Ix from '../Ix';
import '../asynciterablehelpers';
import { Iterable } from '../Ix';
const { toDOMStream } = Ix.iterable;

(() => {
  if (!toDOMStream || process.env.TEST_DOM_STREAMS !== 'true') {
    return test('not testing node streams because process.env.TEST_DOM_STREAMS !== "true"', () => {
      /**/
    });
  }

  const stringsItr = () => Iterable.from([1, 2, 3]).map(i => `${i}`);
  const buffersItr = () => stringsItr().map(val => Buffer.from(val));
  const objectsItr = () => stringsItr().map(val => ({ val }));
  const compare = <T>(a: T, b: T) => {
    let aVal = ArrayBuffer.isView(a) ? `${Buffer.from(a.buffer, a.byteOffset, a.byteLength)}` : a;
    let bVal = ArrayBuffer.isView(b) ? `${Buffer.from(b.buffer, b.byteOffset, b.byteLength)}` : b;
    // poor man's deep-equals
    try {
      expect(aVal).toEqual(bVal);
    } catch (e) {
      return false;
    }
    return true;
  };

  describe(`Iterable#toDOMStream`, () => {
    describe(`DefaultController`, () => {
      const expectedStrings = ['1', '2', '3'];
      const expectedObjects = expectedStrings.map(val => ({ val }));
      const expectedBuffers = expectedStrings.map(x => Buffer.from(x));
      test(`yields Strings`, async () => {
        const expected = Iterable.from(expectedStrings);
        const actual = stringsItr().toDOMStream();
        await expect(actual).toEqualStream(expected, compare);
      });
      test(`yields Buffers`, async () => {
        const expected = Iterable.from(expectedBuffers);
        const actual = buffersItr().toDOMStream();
        await expect(actual).toEqualStream(expected, compare);
      });
      test(`yields Objects`, async () => {
        const expected = Iterable.from(expectedObjects);
        const actual = objectsItr().toDOMStream();
        await expect(actual).toEqualStream(expected, compare);
      });
    });

    describe(`ReadableByteStreamController (byobRequest)`, () => {
      const expectedStrings = ['123'];
      const expectedBuffers = expectedStrings.map(x => Buffer.from(x));
      test(`yields Strings`, async () => {
        const expected = Iterable.from(expectedBuffers);
        const actual = stringsItr()
          .map(x => Buffer.from(x))
          .toDOMStream({ type: 'bytes' });
        await expect(actual).toEqualStream(expected, compare);
      });
      test(`yields Buffers`, async () => {
        const expected = Iterable.from(expectedBuffers);
        const actual = buffersItr().toDOMStream({ type: 'bytes' });
        await expect(actual).toEqualStream(expected, compare);
      });
    });

    describe(`ReadableByteStreamController (autoAllocateChunkSize)`, () => {
      const expectedStrings = ['123'];
      const expectedBuffers = expectedStrings.map(x => Buffer.from(x));
      test(`yields Strings`, async () => {
        const expected = Iterable.from(expectedBuffers);
        const actual = stringsItr()
          .map(x => Buffer.from(x))
          .toDOMStream({ type: 'bytes', autoAllocateChunkSize: 1024 });
        await expect(actual).toEqualStream(expected, compare);
      });
      test(`yields Buffers`, async () => {
        const expected = Iterable.from(expectedBuffers);
        const actual = buffersItr().toDOMStream({ type: 'bytes', autoAllocateChunkSize: 1024 });
        await expect(actual).toEqualStream(expected, compare);
      });
    });
  });
})();
