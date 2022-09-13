import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { reset, copy, html } from './gulp/tasks/index.js';

global.app = {
    path,
    gulp,
};

const watcher = () => {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, copy);
};

const mainTasks = gulp.parallel(copy, html);

const dev = gulp.series(reset, mainTasks, watcher);

gulp.task('default', dev);
