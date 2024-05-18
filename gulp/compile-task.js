import { Observable } from 'rxjs';
import { npmPkgName } from './util.js';
import { memoizeTask } from './memoize-task.js';

import closureTask from './closure-task.js';
import typescriptTask from './typescript-task.js';
import { copyMainTask, copyTSTask } from './copy-main-task.js';

const compileTask = ((cache) => memoizeTask(cache, function compile(target, format, ...args) {
    return target === `src`      ? Observable.empty()
         : target === npmPkgName ? copyMainTask(target, format, ...args)()
         : target === `ts`       ? copyTSTask(target, format, ...args)()
         : format === `umd`      ? closureTask(target, format, ...args)()
                                 : typescriptTask(target, format, ...args)();
}))({});

export default compileTask;
