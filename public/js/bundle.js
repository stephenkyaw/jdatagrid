var jdatagrid;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((module) => {

(function () {
    function data() {
        let data_list = [];
        this.add = (data) => {
            data_list.push(data);
        }
        this.get = () => {
            return data_list;
        }
        this.update = (index, data) => {
            data_list[index] = data;
        }
        this.delete = (index) => {
            data_list.splice(index, 1);
            serialize_auto_increment_id();
        }
        this.get_by_index = (index) => {
            return data_list[index];
        }
        this.count = () => {
            return data_list.length;
        }

        serialize_auto_increment_id = () => {
            data_list.forEach(function (item, index) {
                item.auto_increment_id = index + 1;
            });
        }
    }
    module.exports = { data };
})();

/***/ }),

/***/ "./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/***/ ((module) => {

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

/***/ }),

/***/ "./src/jdatagrid.js":
/*!**************************!*\
  !*** ./src/jdatagrid.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

(function () {

    const { options, item_object } = __webpack_require__(/*! ./options */ "./src/options.js");
    const { data } = __webpack_require__(/*! ./data */ "./src/data.js");
    const { input } = __webpack_require__(/*! ./input */ "./src/input.js");
    const { table } = __webpack_require__(/*! ./table */ "./src/table.js");

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

/***/ }),

/***/ "./src/options.js":
/*!************************!*\
  !*** ./src/options.js ***!
  \************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./src/table.js":
/*!**********************!*\
  !*** ./src/table.js ***!
  \**********************/
/***/ ((module) => {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/jdatagrid.js");
/******/ 	jdatagrid = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsQ0FBQzs7Ozs7Ozs7OztBQzlCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsa0JBQWtCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxrQkFBa0I7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCxVQUFVO0FBQ3hFO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0Ysa0JBQWtCO0FBQ2xHLG9GQUFvRixrQkFBa0I7QUFDdEc7QUFDQSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEUsZUFBZTtBQUN6RiwyQ0FBMkMsZUFBZSxHQUFHLGtCQUFrQjtBQUMvRSw2Q0FBNkMsZUFBZSxHQUFHLGtCQUFrQjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLGVBQWUsR0FBRyxrQkFBa0I7QUFDdEc7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0ZBQW9GLGtCQUFrQjtBQUN0RztBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0Esa0ZBQWtGLFdBQVc7QUFDN0Y7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1GQUFtRixnQkFBZ0I7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsVUFBVTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRkFBMkYsZ0JBQWdCO0FBQzNHO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLENBQUM7Ozs7Ozs7Ozs7O0FDdFVZO0FBQ2I7QUFDQTtBQUNBLFlBQVksdUJBQXVCLEVBQUUsbUJBQU8sQ0FBQyxtQ0FBVztBQUN4RCxZQUFZLE9BQU8sRUFBRSxtQkFBTyxDQUFDLDZCQUFRO0FBQ3JDLFlBQVksUUFBUSxFQUFFLG1CQUFPLENBQUMsK0JBQVM7QUFDdkMsWUFBWSxRQUFRLEVBQUUsbUJBQU8sQ0FBQywrQkFBUztBQUN2QztBQUNBO0FBQ0E7QUFDQSxVQUFVLHFFQUFxRSxJQUFJO0FBQ25GO0FBQ0Esc0JBQXNCLGlEQUFpRDtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsQ0FBQzs7Ozs7Ozs7OztBQ2hERDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsQ0FBQzs7Ozs7Ozs7OztBQzFCRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RTtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyx3QkFBd0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QixzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLG9DQUFvQztBQUNwQyxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsQ0FBQzs7Ozs7O1VDcEpEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qZGF0YWdyaWQvLi9zcmMvZGF0YS5qcyIsIndlYnBhY2s6Ly9qZGF0YWdyaWQvLi9zcmMvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vamRhdGFncmlkLy4vc3JjL2pkYXRhZ3JpZC5qcyIsIndlYnBhY2s6Ly9qZGF0YWdyaWQvLi9zcmMvb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9qZGF0YWdyaWQvLi9zcmMvdGFibGUuanMiLCJ3ZWJwYWNrOi8vamRhdGFncmlkL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2pkYXRhZ3JpZC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2pkYXRhZ3JpZC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vamRhdGFncmlkL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gZGF0YSgpIHtcclxuICAgICAgICBsZXQgZGF0YV9saXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5hZGQgPSAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBkYXRhX2xpc3QucHVzaChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhX2xpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlID0gKGluZGV4LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGRhdGFfbGlzdFtpbmRleF0gPSBkYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRlbGV0ZSA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBkYXRhX2xpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgc2VyaWFsaXplX2F1dG9faW5jcmVtZW50X2lkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0X2J5X2luZGV4ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhX2xpc3RbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvdW50ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YV9saXN0Lmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlcmlhbGl6ZV9hdXRvX2luY3JlbWVudF9pZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgZGF0YV9saXN0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmF1dG9faW5jcmVtZW50X2lkID0gaW5kZXggKyAxO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHsgZGF0YSB9O1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgY29uc3QgQUREX0JVVFRPTl9DU1NfQ0xBU1MgPSAnYnRuIGJ0bi1wcmltYXJ5JztcclxuICAgIGNvbnN0IEVESVRfQlVUVE9OX0NTU19DTEFTUyA9ICdidG4gYnRuLXNlY29uZGFyeSBtZS0yJztcclxuICAgIGNvbnN0IERFTEVURV9CVVRUT05fQ1NTX0NMQVNTID0gJ2J0biBidG4tZGFuZ2VyJztcclxuXHJcbiAgICBmdW5jdGlvbiBpbnB1dChfdGFibGVfaW5zdGFjZSwgX2l0ZW1fbGlzdCwgX2RhdGEsIF90YWJsZSkge1xyXG5cclxuICAgICAgICBsZXQgdGFibGVfaW5zdGFuY2UgPSBfdGFibGVfaW5zdGFjZTtcclxuICAgICAgICBsZXQgaXRlbV9saXN0ID0gX2l0ZW1fbGlzdDtcclxuICAgICAgICBsZXQgZGF0YSA9IF9kYXRhO1xyXG4gICAgICAgIGxldCB0YWJsZSA9IF90YWJsZTtcclxuXHJcbiAgICAgICAgLyogaW5wdXQgY29udHJvbHMgZnVuY3Rpb25zICovXHJcbiAgICAgICAgdGhpcy5jcmVhdGVkX2NvbnRyb2xzID0gKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgbGV0IF9pbnB1dDtcclxuICAgICAgICAgICAgc3dpdGNoIChpdGVtLmlucHV0X3R5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnZGF0ZXRpbWUtbG9jYWwnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3Bhc3N3b3JkJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3NlYXJjaCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0ZWwnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAndGV4dCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0aW1lJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3VybCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICd3ZWVrJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3JhbmdlJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3VybCc6XHJcbiAgICAgICAgICAgICAgICAgICAgX2lucHV0ID0gY3JlYXRlZF9jb250cm9sX2lucHV0KGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnc2VsZWN0JzpcclxuICAgICAgICAgICAgICAgICAgICBfaW5wdXQgPSBjcmVhdGVkX2NvbnRyb2xfc2VsZWN0KGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnY2hlY2tib3gnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAncmFkaW8nOlxyXG4gICAgICAgICAgICAgICAgICAgIF9pbnB1dCA9IGNyZWF0ZWRfY29udHJvbF9jaGVja2JveF9yYWRpbyhpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgICAgICBfaW5wdXQudHlwZSA9ICd0ZXh0JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjcmVhdGVkX2F0dHJpYnV0ZXMoX2lucHV0LCBpdGVtLmF0dHJpYnV0ZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gX2lucHV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjcmVhdGVkX2NvbnRyb2xfaW5wdXQgPSAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICAgICAgX2lucHV0LnR5cGUgPSBpdGVtLmlucHV0X3R5cGU7XHJcbiAgICAgICAgICAgIF9pbnB1dC5pZCA9IGl0ZW0ubmFtZTtcclxuICAgICAgICAgICAgX2lucHV0Lm5hbWUgPSBpdGVtLm5hbWU7XHJcbiAgICAgICAgICAgIF9pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCBpdGVtLmlucHV0X3R5cGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gX2lucHV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjcmVhdGVkX2NvbnRyb2xfY2hlY2tib3hfcmFkaW8gPSAoaXRlbSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoaXRlbS5kYXRhKSAhPSBcInVuZGVmaW5lZFwiICYmIGl0ZW0uZGF0YS5sZW5ndGggPiAwICYmIGl0ZW0uZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBfaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2lucHV0LnR5cGUgPSBpdGVtLmlucHV0X3R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgX2lucHV0LnZhbHVlID0gZGF0YS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBfaW5wdXQubmFtZSA9IGl0ZW0ubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBfaW5wdXQuaWQgPSBkYXRhLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIF9pbnB1dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGV4dCcsIGRhdGEudGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWwuaW5uZXJIVE1MID0gZGF0YS50ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChfaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5hcHBlbmRDaGlsZChsYWJlbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgaXRlbS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBpdGVtLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgndHlwZScsIGl0ZW0uaW5wdXRfdHlwZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGl2O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IF9pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICBfaW5wdXQudHlwZSA9IGl0ZW0uaW5wdXRfdHlwZTtcclxuICAgICAgICAgICAgICAgIF9pbnB1dC5pZCA9IGl0ZW0ubmFtZTtcclxuICAgICAgICAgICAgICAgIF9pbnB1dC5uYW1lID0gaXRlbS5uYW1lO1xyXG4gICAgICAgICAgICAgICAgX2lucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsIGl0ZW0uaW5wdXRfdHlwZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2lucHV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZWRfY29udHJvbF9zZWxlY3QgPSAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKGl0ZW0uZGF0YSkgIT0gXCJ1bmRlZmluZWRcIiAmJiBpdGVtLmRhdGEubGVuZ3RoID4gMCAmJiBpdGVtLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5kYXRhLmZvckVhY2goZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gZGF0YS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24uaW5uZXJIVE1MID0gZGF0YS50ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZWN0LmlkID0gaXRlbS5uYW1lO1xyXG4gICAgICAgICAgICBzZWxlY3QubmFtZSA9IGl0ZW0ubmFtZTtcclxuICAgICAgICAgICAgc2VsZWN0LnNldEF0dHJpYnV0ZSgndHlwZScsICdzZWxlY3QnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY3JlYXRlZF9hdHRyaWJ1dGVzID0gKF9pbnB1dCwgYXR0cmlidXRlcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChhdHRyaWJ1dGVzKSAhPSAndW5kZWZpbmVkJyAmJiBhdHRyaWJ1dGVzICE9IG51bGwgJiYgYXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmZvckVhY2goZnVuY3Rpb24gKGF0dHJpYnV0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9pbnB1dC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUsIGF0dHJpYnV0ZS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiBlbmQgaW5wdXQgY29udHJvbHMgZnVuY3Rpb25zICovXHJcblxyXG4gICAgICAgIC8qIGFkZCwgZWRpdCwgZGVsZXRlIGJ1dHRvbiAmIGNsaWNrIGV2ZW50IGhhbmRsZXIqL1xyXG4gICAgICAgIHRoaXMuY3JlYXRlZF9hZGRfYnV0dG9uID0gKGRlZmluZWRfaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYWRkX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBhZGRfYnV0dG9uLmlubmVySFRNTCA9ICdBZGQnO1xyXG4gICAgICAgICAgICBhZGRfYnV0dG9uLmNsYXNzTmFtZSA9ICdidG4gYnRuLXByaW1hcnknO1xyXG4gICAgICAgICAgICBhZGRfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBhZGRfYnV0dG9uX2NsaWNrX2V2ZW50KGRlZmluZWRfaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFkZF9idXR0b247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3JlYXRlZF9lZGl0X2J1dHRvbiA9ICh0YWJsZV9yb3dfaW5kZXgsIGF1dG9faW5jcmVtZW50X2lkKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlZGl0X2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICBlZGl0X2J1dHRvbi5jbGFzc05hbWUgPSAnYnRuIGJ0bi1zZWNvbmRhcnkgbWUtMiBidG5fZWRpdCc7XHJcbiAgICAgICAgICAgIGVkaXRfYnV0dG9uLmlubmVySFRNTCA9ICdFZGl0JztcclxuICAgICAgICAgICAgZWRpdF9idXR0b24uaWQgPSBgaXRlbV9lZGl0X2J1dHRvbl8ke2F1dG9faW5jcmVtZW50X2lkfWA7XHJcbiAgICAgICAgICAgIGVkaXRfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBlZGl0X2J1dHRvbl9jbGlja19ldmVudCh0YWJsZV9yb3dfaW5kZXgsIGF1dG9faW5jcmVtZW50X2lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZWRpdF9idXR0b247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY3JlYXRlZF9kZWxldGVfYnV0dG9uID0gKGF1dG9faW5jcmVtZW50X2lkKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkZWxldGVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIGRlbGV0ZV9idXR0b24uY2xhc3NOYW1lID0gJ2J0biBidG4tZGFuZ2VyJztcclxuICAgICAgICAgICAgZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPSAnRGVsZXRlJztcclxuICAgICAgICAgICAgZGVsZXRlX2J1dHRvbi5pZCA9IGBpdGVtX2RlbGV0ZV9idXR0b25fJHthdXRvX2luY3JlbWVudF9pZH1gO1xyXG4gICAgICAgICAgICBkZWxldGVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVfYnV0dG9uX2NsaWNrX2V2ZW50KGF1dG9faW5jcmVtZW50X2lkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVsZXRlX2J1dHRvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYWRkX2J1dHRvbl9jbGlja19ldmVudCA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW1fb2JqZWN0ID0gZGVmaW5lZF9pdGVtO1xyXG4gICAgICAgICAgICBpdGVtX2xpc3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IF9pbnB1dCA9IHRhYmxlX2luc3RhbmNlLnF1ZXJ5U2VsZWN0b3IoYCMke2l0ZW0ubmFtZX1gKTtcclxuICAgICAgICAgICAgICAgIGl0ZW1fb2JqZWN0W2l0ZW0ubmFtZV0gPSBnZXRfaW5wdXRfdmFsdWUoX2lucHV0LCBpdGVtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRhdGEuYWRkKGl0ZW1fb2JqZWN0KTtcclxuICAgICAgICAgICAgdGFibGUucmVuZGVyX3RhYmxlX3Jvd3MoKTtcclxuICAgICAgICAgICAgY2xlYW5faW5wdXRfdmFsdWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lZGl0X2J1dHRvbl9jbGlja19ldmVudCA9ICh0YWJsZV9lZGl0X2luZGV4LCBhdXRvX2luY3JlbWVudF9pZCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgZWRpdF9idXR0b24gPSB0YWJsZV9pbnN0YW5jZS5xdWVyeVNlbGVjdG9yKGAjaXRlbV9lZGl0X2J1dHRvbl8ke2F1dG9faW5jcmVtZW50X2lkfWApO1xyXG4gICAgICAgICAgICBsZXQgZGVsZXRlX2J1dHRvbiA9IHRhYmxlX2luc3RhbmNlLnF1ZXJ5U2VsZWN0b3IoYCNpdGVtX2RlbGV0ZV9idXR0b25fJHthdXRvX2luY3JlbWVudF9pZH1gKTtcclxuICAgICAgICAgICAgbGV0IHJvdyA9IHRhYmxlX2luc3RhbmNlLnJvd3NbdGFibGVfZWRpdF9pbmRleF07XHJcbiAgICAgICAgICAgIGxldCBlZGl0X2l0ZW0gPSBkYXRhLmdldF9ieV9pbmRleChhdXRvX2luY3JlbWVudF9pZCAtIDEpOy8vLTEgZm9yIGFycmF5IGluZGV4IHN0YXJ0IGJ5IHplcm9cclxuICAgICAgICAgICAgaWYgKGVkaXRfYnV0dG9uLmlubmVySFRNTCA9PSAnRWRpdCcpIHtcclxuICAgICAgICAgICAgICAgIGVkaXRfYnV0dG9uLmlubmVySFRNTCA9ICdVcGRhdGUnO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPSBcIkNhbmNlbFwiO1xyXG4gICAgICAgICAgICAgICAgaXRlbV9saXN0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW1fdHlwZSwgX2luZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsb25lX2NvbnRyb2xzID0gdGFibGVfaW5zdGFuY2UucXVlcnlTZWxlY3RvcihgIyR7aXRlbV90eXBlLm5hbWV9YCkuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lX2NvbnRyb2xzLmlkID0gYCR7aXRlbV90eXBlLm5hbWV9XyR7YXV0b19pbmNyZW1lbnRfaWR9YDtcclxuICAgICAgICAgICAgICAgICAgICBjbG9uZV9jb250cm9scy5uYW1lID0gYCR7aXRlbV90eXBlLm5hbWV9XyR7YXV0b19pbmNyZW1lbnRfaWR9YDtcclxuICAgICAgICAgICAgICAgICAgICBzZXRfaW5wdXRfdmFsdWUoY2xvbmVfY29udHJvbHMsIGVkaXRfaXRlbVtpdGVtX3R5cGUubmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdy5jZWxsc1tfaW5kZXggKyAxXS5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICByb3cuY2VsbHNbX2luZGV4ICsgMV0uYXBwZW5kQ2hpbGQoY2xvbmVfY29udHJvbHMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZWRpdF9idXR0b24uaW5uZXJIVE1MID09ICdVcGRhdGUnKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtX2xpc3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbV90eXBlLCBfaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgX2lucHV0ID0gdGFibGVfaW5zdGFuY2UucXVlcnlTZWxlY3RvcihgIyR7aXRlbV90eXBlLm5hbWV9XyR7YXV0b19pbmNyZW1lbnRfaWR9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdF9pdGVtW2l0ZW1fdHlwZS5uYW1lXSA9IGdldF9pbnB1dF92YWx1ZShfaW5wdXQsIGl0ZW1fdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGVkaXRfYnV0dG9uLmlubmVySFRNTCA9IFwiRWRpdFwiO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPSBcIkRlbGV0ZVwiO1xyXG4gICAgICAgICAgICAgICAgdGFibGUucmVuZGVyX3RhYmxlX3Jvd3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBkZWxldGVfYnV0dG9uX2NsaWNrX2V2ZW50ID0gKGF1dG9faW5jcmVtZW50X2lkKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkZWxldGVfYnV0dG9uID0gdGFibGVfaW5zdGFuY2UucXVlcnlTZWxlY3RvcihgI2l0ZW1fZGVsZXRlX2J1dHRvbl8ke2F1dG9faW5jcmVtZW50X2lkfWApO1xyXG4gICAgICAgICAgICBpZiAoZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPT0gXCJEZWxldGVcIikge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5kZWxldGUoYXV0b19pbmNyZW1lbnRfaWQgLSAxKTtcclxuICAgICAgICAgICAgICAgIHRhYmxlLnJlbmRlcl90YWJsZV9yb3dzKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGVsZXRlX2J1dHRvbi5pbm5lckhUTUwgPT0gXCJDYW5jZWxcIikge1xyXG4gICAgICAgICAgICAgICAgdGFibGUucmVuZGVyX3RhYmxlX3Jvd3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2V0X2lucHV0X3ZhbHVlID0gKF9pbnB1dCwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChfaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJykpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnZGF0ZXRpbWUtbG9jYWwnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3Bhc3N3b3JkJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3NlYXJjaCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0ZWwnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAndGV4dCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0aW1lJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3VybCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICd3ZWVrJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3JhbmdlJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3VybCc6XHJcbiAgICAgICAgICAgICAgICAgICAgX2lucHV0LnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdjaGVja2JveCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdyYWRpbyc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAodmFsdWUpID09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfaW5wdXQuY2hlY2tlZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mICh2YWx1ZSkgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgX2NoZWNrX3JhZGlvX2lucHV0ID0gX2lucHV0LnF1ZXJ5U2VsZWN0b3IoYCMke2l0ZW0udmFsdWV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoX2NoZWNrX3JhZGlvX2lucHV0KSAhPSAndW5kZWZpbmVkJyAmJiBfY2hlY2tfcmFkaW9faW5wdXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY2hlY2tfcmFkaW9faW5wdXQuY2hlY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzZWxlY3Qtb25lJzpcclxuICAgICAgICAgICAgICAgICAgICBfaW5wdXQudmFsdWUgPSB2YWx1ZVswXS52YWx1ZTsvL3NlbGVjdCBpcyBvbmx5IG9uZSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBnZXRfaW5wdXRfdmFsdWUgPSAoX2lucHV0LCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcclxuICAgICAgICAgICAgc3dpdGNoIChfaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJykpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnZGF0ZXRpbWUtbG9jYWwnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3Bhc3N3b3JkJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3NlYXJjaCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0ZWwnOlxyXG4gICAgICAgICAgICAgICAgY2FzZSAndGV4dCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICd0aW1lJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3VybCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICd3ZWVrJzpcclxuICAgICAgICAgICAgICAgIC8vY2FzZSAnZmlsZSc6XHJcbiAgICAgICAgICAgICAgICAvL2Nhc2UgJ2hpZGRlbic6XHJcbiAgICAgICAgICAgICAgICAvL2Nhc2UgJ2ltYWdlJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3JhbmdlJzpcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3VybCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBfaW5wdXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdjaGVja2JveCc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdyYWRpbyc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoaXRlbS5kYXRhKSAhPSAndW5kZWZpbmVkJyAmJiBpdGVtLmRhdGEubGVuZ3RoID4gMCAmJiBpdGVtLmRhdGEgIT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoZWNrYm94X2xpc3QgPSBfaW5wdXQucXVlcnlTZWxlY3RvckFsbChgaW5wdXRbdHlwZT1cIiR7aXRlbS5pbnB1dF90eXBlfVwiXWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChjaGVja2JveF9saXN0KSAhPSAndW5kZWZpbmVkJyAmJiBjaGVja2JveF9saXN0ICE9IG51bGwgJiYgY2hlY2tib3hfbGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveF9saXN0LmZvckVhY2goZnVuY3Rpb24gKGNoZWNrYm94KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1fZGF0YSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtX2RhdGEudGV4dCA9IGNoZWNrYm94LmdldEF0dHJpYnV0ZSgnZGF0YS10ZXh0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1fZGF0YS52YWx1ZSA9IGNoZWNrYm94LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKGl0ZW1fZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IF9pbnB1dC5jaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3NlbGVjdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbV9kYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbV9kYXRhLnRleHQgPSBpbnB1dC5vcHRpb25zW2lucHV0LnNlbGVjdGVkSW5kZXhdLnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbV9kYXRhLnZhbHVlID0gaW5wdXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUucHVzaChpdGVtX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNsZWFuX2lucHV0X3ZhbHVlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChpdGVtX2xpc3QpICE9ICd1bmRlZmluZWQnICYmIGl0ZW1fbGlzdC5sZW5ndGggPiAwICYmIGl0ZW1fbGlzdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtX2xpc3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBfaW5wdXQgPSB0YWJsZV9pbnN0YW5jZS5xdWVyeVNlbGVjdG9yKGAjJHtpdGVtLm5hbWV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29sb3InOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGF0ZXRpbWUtbG9jYWwnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtb250aCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3Bhc3N3b3JkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2VhcmNoJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndGVsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndGV4dCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3RpbWUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd1cmwnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd3ZWVrJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmFuZ2UnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd1cmwnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2lucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2hlY2tib3gnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyYWRpbyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChpdGVtLmRhdGEpICE9ICd1bmRlZmluZWQnICYmIGl0ZW0uZGF0YS5sZW5ndGggPiAwICYmIGl0ZW0uZGF0YSAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjaGVja2JveF9saXN0ID0gX2lucHV0LnF1ZXJ5U2VsZWN0b3JBbGwoYGlucHV0W3R5cGU9XCIke2l0ZW0uaW5wdXRfdHlwZX1cIl1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2JveF9saXN0LmZvckVhY2goZnVuY3Rpb24gKGNoZWNrYm94KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2lucHV0LmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzZWxlY3QnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7IGlucHV0IH07XHJcbn0pKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgY29uc3QgeyBvcHRpb25zLCBpdGVtX29iamVjdCB9ID0gcmVxdWlyZSgnLi9vcHRpb25zJyk7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IHJlcXVpcmUoJy4vZGF0YScpO1xyXG4gICAgY29uc3QgeyBpbnB1dCB9ID0gcmVxdWlyZSgnLi9pbnB1dCcpO1xyXG4gICAgY29uc3QgeyB0YWJsZSB9ID0gcmVxdWlyZSgnLi90YWJsZScpO1xyXG5cclxuICAgIGxldCBfdGFibGVfaW5zdGFjZSwgX2RhdGEsIF9pbnB1dCwgX3RhYmxlO1xyXG5cclxuICAgIGxldCB7IF90YWJsZV9uYW1lLCBfaXRlbV9saXN0LCBfaXNfcGFnaW5hdGlvbiwgX3BhZ2Vfc2l6ZSwgX2N1cnJlbnRfcGFnZSB9ID0geyAuLi5vcHRpb25zIH07XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlnKHsgdGFibGVfbmFtZSwgaXRlbV9saXN0LCBpc19wYWdpbmF0aW9uLCBwYWdlX3NpemUgfSkge1xyXG5cclxuICAgICAgICBfdGFibGVfbmFtZSA9IHRhYmxlX25hbWU7XHJcbiAgICAgICAgX2l0ZW1fbGlzdCA9IGl0ZW1fbGlzdDtcclxuICAgICAgICBfaXNfcGFnaW5hdGlvbiA9IGlzX3BhZ2luYXRpb247XHJcbiAgICAgICAgX3BhZ2Vfc2l6ZSA9IHBhZ2Vfc2l6ZTtcclxuXHJcbiAgICAgICAgX3RhYmxlX2luc3RhY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKF90YWJsZV9uYW1lKTtcclxuICAgICAgICBfZGF0YSA9IG5ldyBkYXRhKCk7XHJcbiAgICAgICAgX2lucHV0ID0gbmV3IGlucHV0KF90YWJsZV9pbnN0YWNlLF9pdGVtX2xpc3QsX2RhdGEsX3RhYmxlKTtcclxuICAgICAgICBfdGFibGUgPSBuZXcgdGFibGUoX3RhYmxlX2luc3RhY2UsX2l0ZW1fbGlzdCxfZGF0YSxfaW5wdXQpO1xyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5pdCA9ICgpID0+IHtcclxuICAgICAgICBfdGFibGUucmVuZGVyX2hlYWRlcigpO1xyXG4gICAgICAgIF90YWJsZS5yZW5kZXJfaW5wdXRfcm93KGRlZmluZV9pdGVtX3Byb3BlcnR5KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWZpbmVfaXRlbV9wcm9wZXJ0eSA9ICgpID0+IHtcclxuICAgICAgICBsZXQgaXRlbV9vYmplY3QgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUpO1xyXG4gICAgICAgIF9pdGVtX2xpc3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaXRlbV9vYmplY3QsIGl0ZW0ubmFtZSwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaXRlbV9vYmplY3QuYXV0b19pbmNyZW1lbnRfaWQgPSBfZGF0YS5jb3VudCgpICsgMTtcclxuICAgICAgICByZXR1cm4gaXRlbV9vYmplY3Q7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIG1vZHVsZS5leHBvcnRzID0geyBjb25maWcgfTtcclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9XHJcbiAgICB7XHJcbiAgICAgICAgX3RhYmxlX25hbWU6ICcnLFxyXG4gICAgICAgIF90YWJsZV9pbnN0YWNlOiBudWxsLFxyXG4gICAgICAgIF9pdGVtX2xpc3Q6IFtdLFxyXG4gICAgICAgIF9pc19wYWdpbmF0aW9uOiB0cnVlLFxyXG4gICAgICAgIF9wYWdlX3NpemU6IDUsXHJcbiAgICAgICAgX2RhdGE6IFtdLFxyXG4gICAgICAgIF9jdXJyZW50X3BhZ2U6IDFcclxuICAgIH07XHJcbiAgICBjb25zdCBpdGVtX29iamVjdCA9IChpdGVtX2xpc3QsIGRhdGEpID0+IHtcclxuICAgICAgICBsZXQgaXRlbV9vYmplY3QgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUpO1xyXG4gICAgICAgIGl0ZW1fbGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdGVtX29iamVjdCwgaXRlbS5uYW1lLCB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpdGVtX29iamVjdC5hdXRvX2luY3JlbWVudF9pZCA9IGRhdGEubGVuZ3RoICsgMTtcclxuICAgICAgICByZXR1cm4gaXRlbV9vYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7IG9wdGlvbnMsIGl0ZW1fb2JqZWN0IH07XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIHRhYmxlKF90YWJsZV9pbnN0YWNlLCBfaXRlbV9saXN0LCBfZGF0YSwgX2lucHV0KSB7XHJcblxyXG4gICAgICAgIGxldCB0YWJsZV9pbnN0YW5jZSA9IF90YWJsZV9pbnN0YWNlO1xyXG4gICAgICAgIGxldCBpdGVtX2xpc3QgPSBfaXRlbV9saXN0O1xyXG4gICAgICAgIGxldCBkYXRhID0gX2RhdGE7XHJcbiAgICAgICAgbGV0IGlucHV0ID0gX2lucHV0O1xyXG5cclxuICAgICAgICBjb25zdCByZW5kZXJfdGFibGVfaGVhZGVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGFibGVfaW5zdGFuY2UgIT0gbnVsbCAmJiB0YWJsZV9pbnN0YW5jZSAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRhYmxlX2luc3RhbmNlLmluc2VydFJvdygwKTtcclxuICAgICAgICAgICAgICAgIHJvdy5pbnNlcnRDZWxsKDApLmlubmVySFRNTCA9IFwiTm8uXCI7XHJcbiAgICAgICAgICAgICAgICBpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjZWxsID0gcm93Lmluc2VydENlbGwoaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICBjZWxsLmlubmVySFRNTCA9IGl0ZW0uaGVhZGVyX3RleHQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vZm9yIGFkZCBidXR0b24gY2VsbFxyXG4gICAgICAgICAgICAgICAgcm93Lmluc2VydENlbGwoaXRlbXMubGVuZ3RoICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmVuZGVyX3RhYmxlX2lucHV0X2NvbnRyb2xzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGFibGVfaW5zdGFuY2UgIT0gbnVsbCAmJiB0YWJsZV9pbnN0YW5jZSAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9IHRhYmxlX2luc3RhbmNlLmluc2VydFJvdygxKTtcclxuICAgICAgICAgICAgICAgIC8vZm9yIE5vLiBjZWxsXHJcbiAgICAgICAgICAgICAgICByb3cuaW5zZXJ0Q2VsbCgwKTtcclxuICAgICAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGwgPSByb3cuaW5zZXJ0Q2VsbChpbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IGNyZWF0ZWRfY29udHJvbHMoaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5hcHBlbmRDaGlsZChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vZm9yIGFkZCBidXR0b24gY2VsbFxyXG4gICAgICAgICAgICAgICAgbGV0IGFkZF9idG5fY2VsbCA9IHJvdy5pbnNlcnRDZWxsKGl0ZW1zLmxlbmd0aCArIDEpO1xyXG4gICAgICAgICAgICAgICAgYWRkX2J0bl9jZWxsLmFwcGVuZENoaWxkKGNyZWF0ZWRfYWRkX2J1dHRvbigpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjbGVhbl90YWJsZV9yb3dzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcm93Q291bnQgPSB0YWJsZV9pbnN0YW5jZS5yb3dzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIHdoaWxlIChyb3dDb3VudCA+PSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0YWJsZV9pbnN0YW5jZS5kZWxldGVSb3cocm93Q291bnQpO1xyXG4gICAgICAgICAgICAgICAgcm93Q291bnQtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBnZXRfcGFnaW5hdGlvbl9pdGVtcyA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IF9pdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoaXNfcGFnaW5hdGlvbiA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiBwYWdlX3NpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfaXRlbXMgPSBkYXRhLnNsaWNlKChjdXJyZW50X3BhZ2UgLSAxKSAqIHBhZ2Vfc2l6ZSwgY3VycmVudF9wYWdlICogcGFnZV9zaXplKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2l0ZW1zID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF9pdGVtcyA9IGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIF9pdGVtcztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmVuZGVyX3RhYmxlX3Jvd3MgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFuX3RhYmxlX3Jvd3MoKTtcclxuICAgICAgICAgICAgc2VyaWFsaXplX2F1dG9faW5jcmVtZW50X2lkKCk7XHJcbiAgICAgICAgICAgIGxldCBfaXRlbXMgPSBnZXRfcGFnaW5hdGlvbl9pdGVtcygpO1xyXG4gICAgICAgICAgICBpZiAoX2l0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIF9pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0YWJsZV9pbnN0YW5jZS5pbnNlcnRSb3coaW5kZXggKyAyKTtcclxuICAgICAgICAgICAgICAgICAgICByb3cuaW5zZXJ0Q2VsbCgwKS5pbm5lckhUTUwgPSBpdGVtLmF1dG9faW5jcmVtZW50X2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW1fdHlwZSwgX2luZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5pbnNlcnRDZWxsKF9pbmRleCArIDEpLmlubmVySFRNTCA9IGdldF90YWJsZV9yb3dzX3JlbmRlcl92YWx1ZShpdGVtLCBpdGVtX3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBlZGl0X2RlbGV0ZV9jZWxsID0gcm93Lmluc2VydENlbGwoaXRlbXMubGVuZ3RoICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhYmxlX3Jvd19pbmRleCA9IHBhcnNlSW50KGluZGV4KSArIDI7XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdF9kZWxldGVfY2VsbC5hcHBlbmRDaGlsZChjcmVhdGVkX2VkaXRfYnV0dG9uKHRhYmxlX3Jvd19pbmRleCwgaXRlbS5hdXRvX2luY3JlbWVudF9pZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRfZGVsZXRlX2NlbGwuYXBwZW5kQ2hpbGQoY3JlYXRlZF9kZWxldGVfYnV0dG9uKGl0ZW0uYXV0b19pbmNyZW1lbnRfaWQpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlbmRlcl9wYWdpbmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2xlYW5fcGFnaW5hdGlvbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGpncmlkX3BhZ2luYXRpb25fY29udGFpbmVyID0gdGFibGVfaW5zdGFuY2UubmV4dFNpYmxpbmc7Ly9mb3Igb25lIG9yIG1vcmUgdGFibGVcclxuICAgICAgICAgICAgaWYgKGpncmlkX3BhZ2luYXRpb25fY29udGFpbmVyICE9IG51bGwgJiYgamdyaWRfcGFnaW5hdGlvbl9jb250YWluZXIgIT0gJ3VuZGVmaW5lZCcgJiYgamdyaWRfcGFnaW5hdGlvbl9jb250YWluZXIuY2xhc3NOYW1lID09IFwiamdyaWQtcGFnaW5hdGlvbi1jb250YWluZXJcIikge1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGpncmlkX3BhZ2luYXRpb25fY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBqZ3JpZF9wYWdpbmF0aW9uX2NvbnRhaW5lci5yZW1vdmVDaGlsZChqZ3JpZF9wYWdpbmF0aW9uX2NvbnRhaW5lci5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGpncmlkX3BhZ2luYXRpb25fY29udGFpbmVyLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlbmRlcl9wYWdpbmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhbl9wYWdpbmF0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChpc19wYWdpbmF0aW9uID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IHBhZ2Vfc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBqZ3JpZF9wYWdpbmF0aW9uX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGpncmlkX3BhZ2luYXRpb25fY29udGFpbmVyLmNsYXNzTmFtZSA9ICdqZ3JpZC1wYWdpbmF0aW9uLWNvbnRhaW5lcic7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGpncmlkX3BhZ2luYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICBqZ3JpZF9wYWdpbmF0aW9uLmNsYXNzTmFtZSA9ICdqZ3JpZC1wYWdpbmF0aW9uJztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG90YWxfcGFnZV9udW1iZXIgPSBNYXRoLmNlaWwoZGF0YS5sZW5ndGggLyBwYWdlX3NpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyB0b3RhbF9wYWdlX251bWJlciA+PSBpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGpncmlkX3BhZ2luYXRpb25faXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpncmlkX3BhZ2luYXRpb25faXRlbS5jbGFzc05hbWUgPSAnamdyaWQtcGFnaW5hdGlvbi1pdGVtJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGpnaXJkX3BhZ2luYXRpb25faXRlbV9saW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqZ2lyZF9wYWdpbmF0aW9uX2l0ZW1fbGluay5jbGFzc05hbWUgPSAnamdpcmQtcGFnaW5hdGlvbi1pdGVtLWxpbmsnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqZ2lyZF9wYWdpbmF0aW9uX2l0ZW1fbGluay5pbm5lckhUTUwgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqZ2lyZF9wYWdpbmF0aW9uX2l0ZW1fbGluay5ocmVmID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpnaXJkX3BhZ2luYXRpb25faXRlbV9saW5rLm9uY2xpY2sgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudF9wYWdlID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcl90YWJsZV9yb3dzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRfcGFnZSA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqZ2lyZF9wYWdpbmF0aW9uX2l0ZW1fbGluay5jbGFzc05hbWUgKz0gXCIgXCIgKyAncGFnaW5hdGlvbi1saW5rLWFjdGl2ZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgamdyaWRfcGFnaW5hdGlvbl9pdGVtLmFwcGVuZENoaWxkKGpnaXJkX3BhZ2luYXRpb25faXRlbV9saW5rKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpncmlkX3BhZ2luYXRpb24uYXBwZW5kQ2hpbGQoamdyaWRfcGFnaW5hdGlvbl9pdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGpncmlkX3BhZ2luYXRpb25fY29udGFpbmVyLmFwcGVuZENoaWxkKGpncmlkX3BhZ2luYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlX2luc3RhbmNlLmFmdGVyKGpncmlkX3BhZ2luYXRpb25fY29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBnZXRfdGFibGVfcm93c19yZW5kZXJfdmFsdWUgPSAoaXRlbSwgaXRlbV90eXBlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoaXRlbV90eXBlLmRhdGEpICE9ICd1bmRlZmluZWQnICYmIGl0ZW1fdHlwZS5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIChpdGVtW2l0ZW1fdHlwZS5uYW1lXSkgIT0gJ3VuZGVmaW5lZCcgJiYgaXRlbVtpdGVtX3R5cGUubmFtZV0ubGVuZ3RoID4gMCAmJiBpdGVtW2l0ZW1fdHlwZS5uYW1lXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbVtpdGVtX3R5cGUubmFtZV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1baXRlbV90eXBlLm5hbWVdLmZvckVhY2goZnVuY3Rpb24gKF9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmNvbmNhdCgnICcsIF9kYXRhLnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGl0ZW1baXRlbV90eXBlLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIChpdGVtW2l0ZW1fdHlwZS5uYW1lXSkgPT0gJ2Jvb2xlYW4nKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1baXRlbV90eXBlLm5hbWVdID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICcmIzk3NDU7JztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gaXRlbVtpdGVtX3R5cGUubmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHsgdGFibGUgfTtcclxufSkoKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvamRhdGFncmlkLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9