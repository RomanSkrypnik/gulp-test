export function isWebp() {
    function testWebP(cb) {
        const webP = new Image();
        webP.onload = webP.onerror = () => {
            cb(webP.height === 1);
        };
        webP.src = 'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoBAAEAAQAcJaACdLoB+AAETAAA/vW4f/6aR40jxpHxcP/ugT90CfugT/3NoAAA';
    }

    testWebP(function(support) {
        const className = support ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}
