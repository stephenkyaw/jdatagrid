(function () {
    const options =
    {
        _table_name: '',
        _table_instace: null,
        _item_list: [],
        _is_pagination: true,
        _page_size: 5,
        _data: [],
        _current_page: 1
    };
    const item_object = (item_list, data) => {
        let item_object = Object.create(Object.prototype);
        item_list.forEach(function (item) {
            Object.defineProperty(item_object, item.name, {
                value: null,
                writable: true,
                enumerable: true,
                configurable: true
            });
        });
        item_object.auto_increment_id = data.length + 1;
        return item_object;
    }

    module.exports = { options, item_object };
})();