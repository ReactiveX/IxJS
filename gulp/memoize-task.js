import { taskName } from './util.js';

export const createTask = ((taskFn) => ((target, format, ...args) => {
    // Give the memoized fn a displayName so gulp's output is easier to follow.
    const fn = () => taskFn(target, format, ...args);
    fn.displayName = `${taskFn.name || ``}:${taskName(target, format, ...args)}:task`;
    return fn;
}));

export const memoizeTask = ((cache, taskFn) => ((target, format, ...args) => {
    // Give the memoized fn a displayName so gulp's output is easier to follow.
    const fn = () => (
        cache[taskName(target, format)] || (
            cache[taskName(target, format)] = taskFn(target, format, ...args)));
    fn.displayName = `${taskFn.name || ``}:${taskName(target, format, ...args)}:task`;
    return fn;
}));

export default memoizeTask;
