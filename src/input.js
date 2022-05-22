(function () {

    const ADD_BUTTON_CSS_CLASS = 'btn btn-primary';
    const EDIT_BUTTON_CSS_CLASS = 'btn btn-secondary me-2';
    const DELETE_BUTTON_CSS_CLASS = 'btn btn-danger';

    function input(_table_instace, _item_list, _data, _table) {

        let table_instance = _table_instace;
        let item_list = _item_list;
        let data = _data;
        let table = _table;

        /* input controls functions */
        this.created_controls = (item) => {
            let _input;
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
                case 'range':
                case 'url':
                    _input = created_control_input(item);
                    break;
                case 'select':
                    _input = created_control_select(item);
                    break;
                case 'checkbox':
                case 'radio':
                    _input = created_control_checkbox_radio(item);
                    break;
                default:
                    _input = document.createElement('input');
                    _input.type = 'text';
            }
            created_attributes(_input, item.attributes);
            return _input;
        }
        const created_control_input = (item) => {
            let _input = document.createElement('input');
            _input.type = item.input_type;
            _input.id = item.name;
            _input.name = item.name;
            _input.setAttribute('type', item.input_type);
            return _input;
        }
        const created_control_checkbox_radio = (item) => {

            if (typeof (item.data) != "undefined" && item.data.length > 0 && item.data != null) {
                let div = document.createElement('div');
                item.data.forEach(function (data) {
                    let _input = document.createElement('input');
                    let label = document.createElement('label');
                    _input.type = item.input_type;
                    _input.value = data.value;
                    _input.name = item.name;
                    _input.id = data.value;
                    _input.setAttribute('data-text', data.text);
                    label.innerHTML = data.text;
                    div.appendChild(_input);
                    div.appendChild(label);
                });
                div.setAttribute('id', item.name);
                div.setAttribute('name', item.name);
                div.setAttribute('type', item.input_type);
                return div;
            } else {
                let _input = document.createElement('input');
                _input.type = item.input_type;
                _input.id = item.name;
                _input.name = item.name;
                _input.setAttribute('type', item.input_type);
                return _input;
            }
        }
        const created_control_select = (item) => {
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
        const created_attributes = (_input, attributes) => {
            if (typeof (attributes) != 'undefined' && attributes != null && attributes.length > 0) {
                attributes.forEach(function (attribute) {
                    _input.setAttribute(attribute.name, attribute.value);
                });
            }
        }
        /* end input controls functions */

        /* add, edit, delete button & click event handler*/
        this.created_add_button = (defined_item) => {
            let add_button = document.createElement('button');
            add_button.innerHTML = 'Add';
            add_button.className = 'btn btn-primary';
            add_button.onclick = function () {
                add_button_click_event(defined_item);
            }
            return add_button;
        }
        this.created_edit_button = (table_row_index, auto_increment_id) => {
            let edit_button = document.createElement('button');
            edit_button.className = 'btn btn-secondary me-2 btn_edit';
            edit_button.innerHTML = 'Edit';
            edit_button.id = `item_edit_button_${auto_increment_id}`;
            edit_button.onclick = function () {
                edit_button_click_event(table_row_index, auto_increment_id);
            }
            return edit_button;
        }
        this.created_delete_button = (auto_increment_id) => {
            let delete_button = document.createElement('button');
            delete_button.className = 'btn btn-danger';
            delete_button.innerHTML = 'Delete';
            delete_button.id = `item_delete_button_${auto_increment_id}`;
            delete_button.onclick = function () {
                delete_button_click_event(auto_increment_id);
            }
            return delete_button;
        }
        const add_button_click_event = () => {
            let item_object = defined_item;
            item_list.forEach(function (item) {
                let _input = table_instance.querySelector(`#${item.name}`);
                item_object[item.name] = get_input_value(_input, item);
            });
            data.add(item_object);
            table.render_table_rows();
            clean_input_value();
        }
        this.edit_button_click_event = (table_edit_index, auto_increment_id) => {
            let edit_button = table_instance.querySelector(`#item_edit_button_${auto_increment_id}`);
            let delete_button = table_instance.querySelector(`#item_delete_button_${auto_increment_id}`);
            let row = table_instance.rows[table_edit_index];
            let edit_item = data.get_by_index(auto_increment_id - 1);//-1 for array index start by zero
            if (edit_button.innerHTML == 'Edit') {
                edit_button.innerHTML = 'Update';
                delete_button.innerHTML = "Cancel";
                item_list.forEach(function (item_type, _index) {
                    let clone_controls = table_instance.querySelector(`#${item_type.name}`).cloneNode(true);
                    clone_controls.id = `${item_type.name}_${auto_increment_id}`;
                    clone_controls.name = `${item_type.name}_${auto_increment_id}`;
                    set_input_value(clone_controls, edit_item[item_type.name]);
                    row.cells[_index + 1].innerHTML = '';
                    row.cells[_index + 1].appendChild(clone_controls);
                });
            }
            else if (edit_button.innerHTML == 'Update') {
                item_list.forEach(function (item_type, _index) {
                    let _input = table_instance.querySelector(`#${item_type.name}_${auto_increment_id}`);
                    edit_item[item_type.name] = get_input_value(_input, item_type);
                });
                edit_button.innerHTML = "Edit";
                delete_button.innerHTML = "Delete";
                table.render_table_rows();
            }
        }
        const delete_button_click_event = (auto_increment_id) => {
            let delete_button = table_instance.querySelector(`#item_delete_button_${auto_increment_id}`);
            if (delete_button.innerHTML == "Delete") {
                data.delete(auto_increment_id - 1);
                table.render_table_rows();
            } else if (delete_button.innerHTML == "Cancel") {
                table.render_table_rows();
            }
        }

        const set_input_value = (_input, value) => {
            switch (_input.getAttribute('type')) {
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
                    _input.value = value;
                    break;
                case 'checkbox':
                case 'radio':
                    if (typeof (value) == 'boolean') {
                        _input.checked = value;
                    } else if (typeof (value) == 'object') {
                        if (value.length > 0) {
                            value.forEach(function (item) {
                                let _check_radio_input = _input.querySelector(`#${item.value}`);
                                if (typeof (_check_radio_input) != 'undefined' && _check_radio_input != null) {
                                    _check_radio_input.checked = true;
                                }
                            });
                        }
                    }
                    break;
                case 'select-one':
                    _input.value = value[0].value;//select is only one value
                    break;
                default:
                    value = '';
                    break;
            }

        }
        const get_input_value = (_input, item) => {
            let value;
            switch (_input.getAttribute('type')) {
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
                    value = _input.value;
                    break;
                case 'checkbox':
                case 'radio':
                    if (typeof (item.data) != 'undefined' && item.data.length > 0 && item.data != null) {

                        let checkbox_list = _input.querySelectorAll(`input[type="${item.input_type}"]`);
                        value = [];
                        if (typeof (checkbox_list) != 'undefined' && checkbox_list != null && checkbox_list.length > 0) {
                            checkbox_list.forEach(function (checkbox) {
                                if (checkbox.checked) {
                                    let item_data = {};
                                    item_data.text = checkbox.getAttribute('data-text');
                                    item_data.value = checkbox.value;
                                    value.push(item_data);
                                }
                            });
                        }
                    } else {
                        value = _input.checked;
                    }
                    break;
                case 'select':
                    value = [];
                    let item_data = {};
                    item_data.text = input.options[input.selectedIndex].text;
                    item_data.value = input.value;
                    value.push(item_data);
                    break;
                default:
                    value = '';
                    break;
            }

            return value;
        }
        const clean_input_value = () => {
            if (typeof (item_list) != 'undefined' && item_list.length > 0 && item_list != null) {
                item_list.forEach(function (item) {
                    let _input = table_instance.querySelector(`#${item.name}`);
                    switch (_input.getAttribute('type')) {
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
                            _input.value = '';
                            break;
                        case 'checkbox':
                        case 'radio':
                            if (typeof (item.data) != 'undefined' && item.data.length > 0 && item.data != null) {

                                let checkbox_list = _input.querySelectorAll(`input[type="${item.input_type}"]`);
                                checkbox_list.forEach(function (checkbox) {
                                    checkbox.checked = false;
                                });
                            } else {
                                _input.checked = false;
                            }
                            break;
                        case 'select':
                            //input.value = '';
                            break;
                    }
                });
            }
        }
    }

    module.exports = { input };
})();