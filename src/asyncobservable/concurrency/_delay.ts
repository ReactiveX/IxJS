import { AbortError } from '../../aborterror';

export function delay(dueTime: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new AbortError());
    }

    const id = setTimeout(() => {
      if (signal.aborted) {
        reject(new AbortError());
      } else {
        resolve();
      }
    }, dueTime);

    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(id);
        reject(new AbortError());
      },
      { once: true }
    );
  });
}
