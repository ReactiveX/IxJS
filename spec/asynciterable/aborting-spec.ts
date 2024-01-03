import '../asynciterablehelpers.js';
import { jest } from '@jest/globals';
import { interval } from 'ix/asynciterable/index.js';
import { take } from 'ix/asynciterable/operators/index.js';

test("Abort signal isn't overloaded with event listeners", async () => {
  const abortController = new AbortController();
  const listeners: (() => void)[] = [];
  // eslint-disable-next-line jest/no-jasmine-globals
  jest
    .spyOn(abortController.signal, 'addEventListener')
    .mockImplementation((_, listener) => listeners.push(listener as any));
  // eslint-disable-next-line jest/no-jasmine-globals
  jest
    .spyOn(abortController.signal, 'removeEventListener')
    .mockImplementation((_, listener) => listeners.splice(listeners.indexOf(listener as any), 1));
  await interval(10)
    .pipe(take(10))
    .forEach(
      () => {
        return;
      },
      null,
      abortController.signal
    );

  expect(abortController.signal.addEventListener).toHaveBeenCalledTimes(10);
  expect(abortController.signal.removeEventListener).toHaveBeenCalledTimes(10);
  expect(listeners).toHaveLength(0);
});
