"use strict";
/*
    options : {
        table : 'table instance',
        items : [
            {
                name : 'object name',
                header_text : 'show in table header text field',
                data_type : 'string' (string,number,date. default is string),
                input_type : 'control type' (text,number,date,date-time,select,checkbox,radio) ,
                attributes : [ { name : 'class', value : 'form-control' } ] (add attribut),
                data : [{ text : 'city', value : 'city_001' }] (for data bind eg. select control)
            },
        is_pagination : ture (or) false (default is true),
        page_size : number (default is 5)
        ]
    }
*/
function jgrid(options) {

    let default_options = { data: [], items: [], is_pagination: true, page_size: 5, current_page: 1 };

    let { data, items, table, is_pagination, page_size, current_page } = { ...default_options, ...options };

    let table_instance = document.querySelector(table);

    this.get_items = function () {
        return items;
    }
    this.get_data = function () {
        return data;
    }
    this.get_table = function () {
        return table;
    }

    function init() {
        render_table_header();
        render_table_input_controls();
    }
    function defined_item() {
        let entity_item = Object.create(Object.prototype);
        items.forEach(function (item) {
            Object.defineProperty(entity_item, item.name, {
                value: null,
                writable: true,
                enumerable: true,
                configurable: true
            });
        });
        entity_item.auto_increment_id = data.length + 1;
        return entity_item;
    }
    function get_pagination_items() {
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
    const set_input_value = (input, value) => {
        switch (input.getAttribute('type')) {
            case 'color':
            case 'date':
            case 'datetime-local':
            case 'month':
            case 'number':
            case 'password':
            case 'search':
            case 'tel':
            case 'text':
            case 'time':
            case 'url':
            case 'week':
            //case 'file':
            //case 'hidden':
            //case 'image':
            case 'range':
            case 'url':
                input.value = value;
                break;
            case 'checkbox':
            case 'radio':
                if (typeof (value) == 'boolean') {
                    input.checked = value;
                } else if (typeof (value) == 'object') {
                    if (value.length > 0) {
                        value.forEach(function (item) {
                            let _check_radio_input = input.querySelector(`#${item.value}`);
                            if (typeof (_check_radio_input) != 'undefined' && _check_radio_input != null) {
                                _check_radio_input.checked = true;
                            }
                        });
                    }
                }
                break;
            case 'select-one':
                input.value = value[0].value;//select is only one value
                break;
            default:
                value = '';
                break;
        }

    }
    const get_input_value = (input, item) => {
        let value;
        switch (input.getAttribute('type')) {
            case 'color':
            case 'date':
            case 'datetime-local':
            case 'month':
            case 'number':
            case 'password':
            case 'search':
            case 'tel':
            case 'text':
            case 'time':
            case 'url':
            case 'week':
            //case 'file':
            //case 'hidden':
            //case 'image':
            case 'range':
            case 'url':
                value = input.value;
                break;
            case 'checkbox':
            case 'radio':
                if (typeof (item.data) != 'undefined' && item.data.length > 0 && item.data != null) {

                    let checkbox_list = input.querySelectorAll(`input[type="${item.input_type}"]`);
                    value = [];
                    if (typeof (checkbox_list) != 'undefined' && checkbox_list != null && checkbox_list.length > 0) {
                        checkbox_list.forEach(function (checkbox) {
                            if (checkbox.checked) {
                                let _data = {};
                                _data.text = checkbox.getAttribute('data-text');
                                _data.value = checkbox.value;
                                value.push(_data);
                            }
                        });
                    }
                } else {
                    value = input.checked;
                }
                break;
            case 'select':
                value = [];
                let _data = {};
                _data.text = input.options[input.selectedIndex].text;
                _data.value = input.value;
                value.push(_data);
                break;
            default:
                value = '';
                break;
        }

        return value;
    }
    const clean_input_value = () => {
        if (typeof (items) != 'undefined' && items.length > 0 && items != null) {
            items.forEach(function (item) {
                let input = table_instance.querySelector(`#${item.name}`);
                switch (input.getAttribute('type')) {
                    case 'color':
                    case 'date':
                    case 'datetime-local':
                    case 'month':
                    case 'number':
                    case 'password':
                    case 'search':
                    case 'tel':
                    case 'text':
                    case 'time':
                    case 'url':
                    case 'week':
                    case 'range':
                    case 'url':
                        input.value = '';
                        break;
                    case 'checkbox':
                    case 'radio':
                        if (typeof (item.data) != 'undefined' && item.data.length > 0 && item.data != null) {

                            let checkbox_list = input.querySelectorAll(`input[type="${item.input_type}"]`);
                            checkbox_list.forEach(function (checkbox) {
                                checkbox.checked = false;
                            });
                        } else {
                            input.checked = false;
                        }
                        break;
                    case 'select':
                        //input.value = '';
                        break;
                }
            });
        }
    }
    function add_button_click_event() {
        let entity_item = defined_item();
        items.forEach(function (item) {
            let input = table_instance.querySelector(`#${item.name}`);
            entity_item[item.name] = get_input_value(input, item);
        });
        data.push(entity_item);
        render_table_rows();
        clean_input_value();
    }
    function edit_button_click_event(table_edit_index, auto_increment_id) {
        let edit_button = table_instance.querySelector(`#item_edit_button_${auto_increment_id}`);
        let delete_button = table_instance.querySelector(`#item_delete_button_${auto_increment_id}`);
        let row = table_instance.rows[table_edit_index];
        let edit_item = data[auto_increment_id - 1];//-1 for array index start by zero
        if (edit_button.innerHTML == 'Edit') {
            edit_button.innerHTML = 'Update';
            delete_button.innerHTML = "Cancel";
            items.forEach(function (item_type, _index) {
                let clone_controls = table_instance.querySelector(`#${item_type.name}`).cloneNode(true);
                clone_controls.id = `${item_type.name}_${auto_increment_id}`;
                clone_controls.name = `${item_type.name}_${auto_increment_id}`;
                set_input_value(clone_controls, edit_item[item_type.name]);
                row.cells[_index + 1].innerHTML = '';
                row.cells[_index + 1].appendChild(clone_controls);
            });
        }
        else if (edit_button.innerHTML == 'Update') {
            items.forEach(function (item_type, _index) {
                let input = table_instance.querySelector(`#${item_type.name}_${auto_increment_id}`);
                edit_item[item_type.name] = get_input_value(input, item_type);
            });
            edit_button.innerHTML = "Edit";
            delete_button.innerHTML = "Delete";
            render_table_rows();
        }
    }
    function delete_button_click_event(auto_increment_id) {
        let delete_button = table_instance.querySelector(`#item_delete_button_${auto_increment_id}`);
        if (delete_button.innerHTML == "Delete") {
            data.splice((auto_increment_id - 1), 1);;
            render_table_rows();
        } else if (delete_button.innerHTML == "Cancel") {
            render_table_rows();
        }
    }
    function render_table_header() {
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
    function render_table_input_controls() {
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
    function clean_table_rows() {
        let rowCount = table_instance.rows.length - 1;
        while (rowCount >= 2) {
            table_instance.deleteRow(rowCount);
            rowCount--;
        }
    }
    function serialize_auto_increment_id() {
        data.forEach(function (item, index) {
            item.auto_increment_id = index + 1;
        });
    }
    const get_table_rows_render_value = (item, item_type) => {
        let value;

        if (typeof (item_type.data) != 'undefined' && item_type.data != null) {
            value = '';
            if (typeof (item[item_type.name]) != 'undefined' && item[item_type.name].length > 0 && item[item_type.name] != null) {
                item[item_type.name].forEach(function (_data) {
                    value = value.concat(' ', _data.text);
                });
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
    function render_table_rows() {
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
    function clean_pagination() {
        let jgrid_pagination_container = table_instance.nextSibling;//for one or more table
        if (jgrid_pagination_container != null && jgrid_pagination_container != 'undefined' && jgrid_pagination_container.className == "jgrid-pagination-container") {
            while (jgrid_pagination_container.firstChild) {
                jgrid_pagination_container.removeChild(jgrid_pagination_container.firstChild);
            }
            jgrid_pagination_container.remove();
        }
    }
    function render_pagination() {
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
    function created_add_button() {
        let add_button = document.createElement('button');
        add_button.innerHTML = 'Add';
        add_button.className = 'btn btn-primary';
        add_button.onclick = function () {
            add_button_click_event();
        }
        return add_button;
    }
    function created_edit_button(table_row_index, auto_increment_id) {
        let edit_button = document.createElement('button');
        edit_button.className = 'btn btn-secondary me-2 btn_edit';
        edit_button.innerHTML = 'Edit';
        edit_button.id = `item_edit_button_${auto_increment_id}`;
        edit_button.onclick = function () {
            edit_button_click_event(table_row_index, auto_increment_id);
        }
        return edit_button;
    }
    function created_delete_button(auto_increment_id) {
        let delete_button = document.createElement('button');
        delete_button.className = 'btn btn-danger';
        delete_button.innerHTML = 'Delete';
        delete_button.id = `item_delete_button_${auto_increment_id}`;
        delete_button.onclick = function () {
            delete_button_click_event(auto_increment_id);
        }
        return delete_button;
    }
    function created_controls(item) {
        let input;
        switch (item.input_type) {
            case 'color':
            case 'date':
            case 'datetime-local':
            case 'month':
            case 'number':
            case 'password':
            case 'search':
            case 'tel':
            case 'text':
            case 'time':
            case 'url':
            case 'week':
            case 'file':
            case 'hidden':
            case 'image':
            case 'range':
            case 'url':
                input = created_control_input(item);
                break;
            case 'select':
                input = created_control_select(item);
                break;
            case 'checkbox':
            case 'radio':
                input = created_control_checkbox_radio(item);
                break;
            default:
                input = document.createElement('input');
                input.type = 'text';
        }
        created_attributes(input, item.attributes);
        return input;
    }
    const created_control_input = (item) => {
        let input = document.createElement('input');
        input.type = item.input_type;
        input.id = item.name;
        input.name = item.name;
        input.setAttribute('type', item.input_type);
        return input;
    }
    const created_control_checkbox_radio = (item) => {

        if (typeof (item.data) != "undefined" && item.data.length > 0 && item.data != null) {
            let div = document.createElement('div');
            item.data.forEach(function (data) {
                let input = document.createElement('input');
                let label = document.createElement('label');
                input.type = item.input_type;
                input.value = data.value;
                input.name = item.name;
                input.id = data.value;
                input.setAttribute('data-text', data.text);
                label.innerHTML = data.text;
                div.appendChild(input);
                div.appendChild(label);
            });
            div.setAttribute('id', item.name);
            div.setAttribute('name', item.name);
            div.setAttribute('type', item.input_type);
            return div;
        } else {
            let input = document.createElement('input');
            input.type = item.input_type;
            input.id = item.name;
            input.name = item.name;
            input.setAttribute('type', item.input_type);
            return input;
        }
    }
    function created_control_select(item) {
        let select = document.createElement('select');
        if (typeof (item.data) != "undefined" && item.data.length > 0 && item.data != null) {
            item.data.forEach(function (data) {
                let option = document.createElement('option');
                option.value = data.value;
                option.innerHTML = data.text;
                select.appendChild(option);
            });
        }
        select.id = item.name;
        select.name = item.name;
        select.setAttribute('type', 'select');
        return select;
    }
    const created_attributes = (input, attributes) => {
        if (typeof (attributes) != 'undefined' && attributes != null && attributes.length > 0) {
            attributes.forEach(function (attribute) {
                input.setAttribute(attribute.name, attribute.value);
            });
        }
    }
    this.get_log = function () {
        console.log('data log.....');
        console.log(data);
        console.log('items log.....');
        console.log(items);
        console.log('is_pagination log......');
        console.log(is_pagination);
        console.log('page_size log....');
        console.log(page_size);
        console.log('current_page log....');
        console.log(current_page);
    }


    init();

}