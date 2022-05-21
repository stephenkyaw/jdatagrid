(function () {

    const options = require('./options');

    let { _table_name, _item_list, _table_instance } = { ...options };

    function config({ table_name, item_list }) {

        _table_name = table_name;
        _item_list = item_list;
        _table_instance = document.querySelector(_table_name);

        this.get_data = () => {
            return { table_name: _table_name, item_list: _item_list, table_instance: _table_instance };
        }
    }



    module.exports = { config };
})();