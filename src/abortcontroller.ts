export function createLinkedAbortController(...signals: AbortSignal[]) {
  const controller = new AbortController();

  Array.from(signals).forEach((signal) => {
    signal.addEventListener(
      'abort',
      () => {
        controller.abort();
      },
      { once: true }
    );
  });

  return controller;
}
