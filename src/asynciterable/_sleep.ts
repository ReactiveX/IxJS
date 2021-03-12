import { AbortError } from '../aborterror';

export function sleep(dueTime: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal && signal.aborted) {
      reject(new AbortError());
    }

    const id = setTimeout(() => {
      if (signal) {
        signal.removeEventListener('abort', onAbort);
        if (signal.aborted) {
          onAbort();
          return;
        }
      }

      resolve();
    }, dueTime);

    if (signal) {
      signal.addEventListener('abort', onAbort, { once: true });
    }

    function onAbort() {
      clearTimeout(id);
      reject(new AbortError());
    }
  });
}
