'use strict';

import { toInteger } from  './tointeger';
const maxSafeInteger = Math.pow(2, 53) - 1;

export function toLength (value: any): number {
  const len = toInteger(value);
  return Math.min(Math.max(len, 0), maxSafeInteger);
}
