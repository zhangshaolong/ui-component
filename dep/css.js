/**
 * @file Css样式加载器
 * @author zhangshaolong
 */

define(function (require) {

    var cssMap = {};

    var head = document.getElementsByTagName('head')[0];

    return {
        load: function (resourceId, req, load, config) {
            var path = req.toUrl(resourceId);
            if (!cssMap[path]) {
                cssMap[path] = 1;
                var link = document.createElement('link');
                link.href = path;
                link.setAttribute('rel', 'stylesheet');
                head.appendChild(link);
            }
            load();
        }
    };
});