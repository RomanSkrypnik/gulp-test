import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS',
                message: 'Error: <%= error.message %>',
            }),
        ))
        .pipe(fonter({
            formats: ['ttf'],
        }))
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

export const ttfToWoff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS',
                message: 'Error: <%= error.message %>',
            }),
        ))
        .pipe(fonter({
            formats: ['woff'],
        }))
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};

export const fontsStyle = () => {
    const fontsFile = `${app.path.srcFolder}/scss/base/_fonts.scss`;

    fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
        if (fontsFiles) {
            if (!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (let i = 0; i < fontsFiles.length; i++) {
                    const fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        const fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        const fontType = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        let fontWeight;
                        if (fontType.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontType.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontType.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontType.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontType.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontType.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontType.toLowerCase() === 'extrabold' || fontType.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontType.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }

                        fs.appendFile(fontsFile,
                            `@font-face {
                                font-family: ${fontName} ${fontType};
                                font-display: swap;
                                src: url('../fonts/${fontFileName}.woff2') format('woff2');
                                font-weight: ${fontWeight};
                                font-style: normal;
                            }\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                console.log('File scss/_fonts.scss already exists');
            }
        }
    });

    return app.gulp.src(`${app.path.srcFolder}`);

    function cb() {

    }
};
