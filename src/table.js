(function () {
    function table(_table_instace, _item_list, _data, _input) {

        let table_instance = _table_instace;
        let item_list = _item_list;
        let data = _data;
        let input = _input;

        const render_table_header = () => {
            if (table_instance != null && table_instance != 'undefined') {
                let row = table_instance.insertRow(0);
                row.insertCell(0).innerHTML = "No.";
                items.forEach(function (item, index) {
                    let cell = row.insertCell(index + 1);
                    cell.innerHTML = item.header_text;
                });
                //for add button cell
                row.insertCell(items.length + 1);
            }
        }
        const render_table_input_controls = () => {
            if (table_instance != null && table_instance != 'undefined') {
                let row = table_instance.insertRow(1);
                //for No. cell
                row.insertCell(0);
                items.forEach(function (item, index) {
                    let cell = row.insertCell(index + 1);
                    let input = created_controls(item);
                    cell.appendChild(input);
                });
                //for add button cell
                let add_btn_cell = row.insertCell(items.length + 1);
                add_btn_cell.appendChild(created_add_button());
            }
        }
        const clean_table_rows = () => {
            let rowCount = table_instance.rows.length - 1;
            while (rowCount >= 2) {
                table_instance.deleteRow(rowCount);
                rowCount--;
            }
        }
        const get_pagination_items = () => {
            let _items = [];
            if (is_pagination == true) {
                if (data.length > page_size) {
                    _items = data.slice((current_page - 1) * page_size, current_page * page_size);
                } else {
                    _items = data;
                }
            } else {
                _items = data;
            }
            return _items;
        }
        const render_table_rows = () => {
            clean_table_rows();
            serialize_auto_increment_id();
            let _items = get_pagination_items();
            if (_items.length > 0) {
                _items.forEach(function (item, index) {
                    let row = table_instance.insertRow(index + 2);
                    row.insertCell(0).innerHTML = item.auto_increment_id;
                    items.forEach(function (item_type, _index) {
                        row.insertCell(_index + 1).innerHTML = get_table_rows_render_value(item, item_type);
                    });
                    let edit_delete_cell = row.insertCell(items.length + 1);
                    let table_row_index = parseInt(index) + 2;
                    edit_delete_cell.appendChild(created_edit_button(table_row_index, item.auto_increment_id));
                    edit_delete_cell.appendChild(created_delete_button(item.auto_increment_id));
                });

                render_pagination();
            }
        }
        const clean_pagination = () => {
            let jgrid_pagination_container = table_instance.nextSibling;//for one or more table
            if (jgrid_pagination_container != null && jgrid_pagination_container != 'undefined' && jgrid_pagination_container.className == "jgrid-pagination-container") {
                while (jgrid_pagination_container.firstChild) {
                    jgrid_pagination_container.removeChild(jgrid_pagination_container.firstChild);
                }
                jgrid_pagination_container.remove();
            }
        }
        const render_pagination = () => {
            clean_pagination();
            if (is_pagination == true) {
                if (data.length > page_size) {
                    let jgrid_pagination_container = document.createElement('div');
                    jgrid_pagination_container.className = 'jgrid-pagination-container';
                    let jgrid_pagination = document.createElement('div');
                    jgrid_pagination.className = 'jgrid-pagination';
                    let total_page_number = Math.ceil(data.length / page_size);
                    for (let i = 1; total_page_number >= i; i++) {
                        let jgrid_pagination_item = document.createElement('li');
                        jgrid_pagination_item.className = 'jgrid-pagination-item';
                        let jgird_pagination_item_link = document.createElement('a');
                        jgird_pagination_item_link.className = 'jgird-pagination-item-link';
                        jgird_pagination_item_link.innerHTML = i;
                        jgird_pagination_item_link.href = '';
                        jgird_pagination_item_link.onclick = function (e) {
                            e.preventDefault();
                            current_page = i;
                            render_table_rows();
                        }
                        if (current_page == i) {
                            jgird_pagination_item_link.className += " " + 'pagination-link-active';
                        }
                        jgrid_pagination_item.appendChild(jgird_pagination_item_link);

                        jgrid_pagination.appendChild(jgrid_pagination_item);

                    }
                    jgrid_pagination_container.appendChild(jgrid_pagination);
                    table_instance.after(jgrid_pagination_container);
                }
            }
        }
        const get_table_rows_render_value = (item, item_type) => {
            let value;
            if (typeof (item_type.data) != 'undefined' && item_type.data != null) {
                value = '';
                if (typeof (item[item_type.name]) != 'undefined' && item[item_type.name].length > 0 && item[item_type.name] != null) {
                    if (Array.isArray(item[item_type.name])) {
                        item[item_type.name].forEach(function (_data) {
                            value = value.concat(' ', _data.text);
                        });
                    } else {
                        value = item[item_type.name];
                    }

                }
            } else if (typeof (item[item_type.name]) == 'boolean') {

                if (item[item_type.name] == true) {
                    value = '&#9745;';
                } else {
                    value = '';
                }
            }
            else {
                value = item[item_type.name];
            }

            return value;
        }
    }
    module.exports = { table };
})();