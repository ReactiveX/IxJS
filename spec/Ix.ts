import 'web-streams-polyfill';
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only.js';

// import this before assigning window global since it does a `typeof window` check
// eslint-disable-next-line @typescript-eslint/no-require-imports
// require('web-stream-tools');
import '@openpgp/web-stream-tools';

(<any>global).window = (<any>global).window || global;

// Fix for Jest in node v10.x
Object.defineProperty(ArrayBuffer, Symbol.hasInstance, {
  writable: true,
  configurable: true,
  value(inst: any) {
    return inst && inst.constructor && inst.constructor.name === 'ArrayBuffer';
  },
});

// Require rxjs first so we pick up its polyfilled Symbol.observable
// eslint-disable-next-line @typescript-eslint/no-require-imports
// require('rxjs/internal/symbol/observable');
import 'rxjs/internal/symbol/observable.js';
