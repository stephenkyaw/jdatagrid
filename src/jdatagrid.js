"use strict";
(function () {

    const { options, item_object } = require('./options');
    const { data } = require('./data');
    const { input } = require('./input');
    const { table } = require('./table');

    let _table_instace, _data, _input, _table;

    let { _table_name, _item_list, _is_pagination, _page_size, _current_page } = { ...options };

    function config({ table_name, item_list, is_pagination, page_size }) {

        _table_name = table_name;
        _item_list = item_list;
        _is_pagination = is_pagination;
        _page_size = page_size;

        _table_instace = document.querySelector(_table_name);
        _data = new data();
        _input = new input(_table_instace,_item_list,_data,_table);
        _table = new table(_table_instace,_item_list,_data,_input);

        init();
    }

    const init = () => {
        _table.render_header();
        _table.render_input_row(define_item_property);
    }

    const define_item_property = () => {
        let item_object = Object.create(Object.prototype);
        _item_list.forEach(function (item) {
            Object.defineProperty(item_object, item.name, {
                value: null,
                writable: true,
                enumerable: true,
                configurable: true
            });
        });
        item_object.auto_increment_id = _data.count() + 1;
        return item_object;
    }


    module.exports = { config };
})();