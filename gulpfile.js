import gulp from 'gulp';
import { path } from './gulp/config/path.js';

import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';

global.app = {
    path,
    gulp,
};

const watcher = () => {
    gulp.watch(path.watch.files, copy);
};

const dev = gulp.series(reset, copy, watcher);

gulp.task('default', dev);
