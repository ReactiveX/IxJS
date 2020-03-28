import { AbortError } from '../aborterror';

export function sleep(dueTime: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal && signal.aborted) {
      reject(new AbortError());
    }

    const id = setTimeout(() => {
      if (signal && signal.aborted) {
        reject(new AbortError());
      }

      resolve();
    }, dueTime);

    if (signal) {
      signal.addEventListener(
        'abort',
        () => {
          clearTimeout(id);
          reject(new AbortError());
        },
        { once: true }
      );
    }
  });
}
