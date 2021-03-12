import { interval } from 'ix/asynciterable';
import '../asynciterablehelpers';
import { take } from 'ix/asynciterable/operators';

test('Abort signal isn\'t overloaded with event listeners', async () => {
  const abortController = new AbortController();
  const listeners: (() => void)[] = [];
  spyOn(abortController.signal, 'addEventListener').and.callFake((_, listener) =>
    listeners.push(listener)
  );
  spyOn(abortController.signal, 'removeEventListener').and.callFake((_, listener) =>
    listeners.splice(listeners.indexOf(listener), 1)
  );
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
