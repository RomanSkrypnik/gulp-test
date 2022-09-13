import gulp from 'gulp';
import { reset, copy, html, server, scss, js, images, fontsStyle, otfToTtf, ttfToWoff } from './gulp/tasks/index.js';
import { path, plugins } from './gulp/config/index.js';

global.app = {
    path,
    gulp,
    plugins,
};

const watcher = () => {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
};

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.parallel(fonts, copy, html, scss, js);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

gulp.task('default', dev);
