define(function (require) {

    require('tpl!./autocomplete.tpl');

    var getDataByKey = function (data, key) {
        var result = [];
        if (!data) {
            return result;
        }
        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i];
            if (item.name.indexOf(key) > -1) {
                result.push(item);
            }
        }
        for (var i = 0, len = data.length; i < len; i++) {
            var item = data[i];
            if (item.code.indexOf(key) === 0) {
                result.push(item);
            }
        }
        return result;
    };

    var Autocomplete = require('ui').create({
        init: function () {
            var autoConatinerNode = this.autoConatinerNode = $('<div class="widgets-autocomplete">');
            $(this.context).append(autoConatinerNode);
        },
        bindEvent: function () {
            var me = this;
            var timer;
            this.element.on('input', function () {
                clearTimeout(timer);
                var ele = this;
                timer = setTimeout(function () {
                    var val = $.trim(ele.value);
                    if (val === '') {
                        me.autoConatinerNode.hide();
                        return;
                    }
                    me.render(getDataByKey(me.data, val));
                }, 30);
                
            })

            .on('click', function (e) {
                e.stopPropagation();
            })

            this.autoConatinerNode.on('click', '.auto-item', function (e) {
                me.element.val($(this).data('name'));
            });
            $(document).on('click', function () {
                me.autoConatinerNode.hide();
            });
        },
        render: function (data) {
            var pageHtml = Simplite.render('autocomplete-template', data || []);
            var offset = this.element.offset();
            this.autoConatinerNode.html(pageHtml).show().find('.dropdown-menu').css({
                top: offset.top + this.element[0].scrollHeight + 2,
                left: offset.left,
                display: 'block'
            });
        },
        getData: function () {
            var data = getDataByKey(this.data, $.trim(this.element.val()));
            if (data.length === 1) {
                return data[0];
            }
        }
    });

    Autocomplete.defaultOptions = {
        context: 'body'
    };

    return Autocomplete;
});