import { deleteAsync as del } from 'del';
import { targetDir } from './util.js';
import memoizeTask from './memoize-task.js';
import { catchError } from 'rxjs/operators/index.js';
import { from as ObservableFrom, EMPTY as ObservableEmpty } from 'rxjs';

export const cleanTask = ((cache) => memoizeTask(cache, function clean(target, format) {
    const dir = targetDir(target, format);
    return ObservableFrom(del(dir))
        .pipe(catchError((e) => ObservableEmpty()));
}))({});

export default cleanTask;
