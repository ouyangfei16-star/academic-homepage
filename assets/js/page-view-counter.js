(function () {
    'use strict';

    var container = document.getElementById('busuanzi_container_page_pv');
    var value = document.getElementById('busuanzi_value_page_pv');
    if (!container || !value) return;

    var callbackName = 'BusuanziCallback_' + Math.floor(Math.random() * 1099511627776);
    var script = document.createElement('script');

    function cleanUp() {
        if (script.parentNode) script.parentNode.removeChild(script);
        try {
            delete window[callbackName];
        } catch (error) {
            window[callbackName] = undefined;
        }
    }

    window[callbackName] = function (stats) {
        var pageViews = Number(stats && stats.page_pv);
        if (Number.isFinite(pageViews)) {
            value.textContent = pageViews;
            container.hidden = false;
        }
        cleanUp();
    };

    script.async = true;
    script.referrerPolicy = 'unsafe-url';
    script.src = 'https://busuanzi.ibruce.info/busuanzi?jsonpCallback=' + callbackName;
    script.onerror = cleanUp;
    document.head.appendChild(script);
})();
