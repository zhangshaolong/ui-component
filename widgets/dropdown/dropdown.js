define(function (require) {

    require('css!./dropdown.css');
    require('tpl!./dropdown.tpl');

    var Dropdown = require('ui').create({
        init: function () {
            this.element.addClass('dropdown-widget');
        },
        bindEvent: function () {
            var me = this;
            this.element.on('click', '.dropdown-item', function (e) {
                var $this = $(this);
                var oldItemNode = $this.siblings('.active');
                if (oldItemNode[0] !== this) {
                    var data = $this.data();
                    oldItemNode.removeClass('active');
                    $this.addClass('active');
                    me.fire('change', data);
                    me.element.find('.selected-item').data('val', data.id).text(data.text);
                }
            });
        },
        render: function (data) {
            var html = Simplite.render('dropdown-template', {
                list: data,
                defaultText: this.defaultText
            });
            this.element.html(html);
        },
        setVal: function (id) {
            var me = this;
            setTimeout(function () {
                me.element.find('.dropdown-item[data-id="' + id + '"]').trigger('click');
            }, 0);
        },
        getVal: function () {
            return this.element.find('.selected-item').data('val');
        }
    });

    Dropdown.defaultOptions = {
        defaultText: '请选择'
    };

    return Dropdown;
});