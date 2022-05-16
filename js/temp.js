
function jgrid(
    _table_instance,
    item_types = [],
    is_pagination = true,
    page_size = 3) {

    this.data = [];
    this.item_types = item_types;
    this.current_page_number = 1;
    this.table_instance = _table_instance;
    this.is_pagination = is_pagination;
    this.page_size = page_size;


    function log(){
        console.log('render_table');
        console.log(this);
        console.log(this.table_instance);
        console.log(item_types);
        console.log(is_pagination);
        console.log(page_size);
    }

    function render_table() {
        

        render_table_header();
        render_table_input_controls();
    }
    function defined_item() {
        let entity_item = Object.create(Object.prototype);
        this.item_types.forEach(function (item) {
            Object.defineProperty(entity_item, item.name, {
                value: null,
                writable: true,
                enumerable: true,
                configurable: true
            });
        });
        entity_item.auto_increment_id = this.data.length + 1;
        return entity_item;
    }
    function get_pagination_items() {
        let _items = [];
        if (this.is_pagination == true) {
            if (this.data.length > this.page_size) {
                _items = this.data.slice((this.current_page_number - 1) * this.page_size, this.current_page_number * this.page_size);
            } else {
                _items = this.data;
            }
        } else {
            _items = this.data;
        }
        return _items;
    }
    function add_button_click_event() {
        let entity_item = defined_item();
        this.item_types.forEach(function (item) {
            let input = this.table_instance.querySelector(`#${item.name}`);
            entity_item[item.name] = input.value;
        });
        this.data.push(entity_item);
        render_table_rows();
    }
    function edit_button_click_event(table_edit_index, auto_increment_id) {
        let edit_button = this.table_instance.querySelector(`#item_edit_button_${auto_increment_id}`);
        let delete_button = this.table_instance.querySelector(`#item_delete_button_${auto_increment_id}`);
        let row = this.table_instance.rows[table_edit_index];
        let edit_item = this.data[auto_increment_id - 1];//-1 for array index start by zero
        if (edit_button.innerHTML == 'Edit') {
            edit_button.innerHTML = 'Update';
            delete_button.innerHTML = "Cancel";
            this.item_types.forEach(function (item_type, _index) {
                let clone_controls = this.table_instance.querySelector(`#${item_type.name}`).cloneNode(true);
                clone_controls.id = `${item_type.name}_${auto_increment_id}`;
                clone_controls.name = `${item_type.name}_${auto_increment_id}`;
                clone_controls.value = edit_item[item_type.name];
                row.cells[_index + 1].innerHTML = '';
                row.cells[_index + 1].appendChild(clone_controls);
            });
        }
        else if (edit_button.innerHTML == 'Update') {
            this.item_types.forEach(function (item_type, _index) {
                edit_item[item_type.name] = this.table_instance.querySelector(`#${item_type.name}_${auto_increment_id}`).value;
            });
            edit_button.innerHTML = "Edit";
            delete_button.innerHTML = "Delete";
            render_table_rows();
        }
    }
    function delete_button_click_event(auto_increment_id) {
        let delete_button = this.table_instance.querySelector(`#item_delete_button_${auto_increment_id}`);
        if (delete_button.innerHTML == "Delete") {
            this.data.splice((auto_increment_id - 1), 1);;
            this.render_table_rows();
        } else if (delete_button.innerHTML == "Cancel") {
            this.render_table_rows();
        }
    }
    function render_table_header() {
        if (this.table_instance != null && this.table_instance != 'undefined') {
            console.log(table_instance);
            let row = table_instance.insertRow(0);
            row.insertCell(0).innerHTML = "No.";
            this.item_types.forEach(function (item, index) {
                let cell = row.insertCell(index + 1);
                cell.innerHTML = item.header_text;
            });
            //for add button cell
            row.insertCell(this.item_types.length + 1);
        }
    }
    function render_table_input_controls() {
        if (this.table_instance != null && this.table_instance != 'undefined') {
            let row = this.table_instance.insertRow(1);
            //for No. cell
            row.insertCell(0);
            this.item_types.forEach(function (item, index) {
                let cell = row.insertCell(index + 1);
                let input = created_controls(item);
                cell.appendChild(input);
            });
            //for add button cell
            let add_btn_cell = row.insertCell(this.item_types.length + 1);
            add_btn_cell.appendChild(created_add_button());
        }
    }
    function clean_table_rows() {
        let rowCount = this.table_instance.rows.length - 1;
        while (rowCount >= 2) {
            this.table_instance.deleteRow(rowCount);
            rowCount--;
        }
    }
    function serialize_auto_increment_id() {
        this.data.forEach(function (item, index) {
            item.auto_increment_id = index + 1;
        });
    }
    function render_table_rows() {
        clean_table_rows();
        serialize_auto_increment_id();
        let items = get_pagination_items();
        if (items.length > 0) {
            items.forEach(function (item, index) {
                let row = this.table_instance.insertRow(index + 2);
                row.insertCell(0).innerHTML = item.auto_increment_id;
                this.item_types.forEach(function (item_type, _index) {
                    row.insertCell(_index + 1).innerHTML = item[item_type.name];
                });
                let edit_delete_cell = row.insertCell(this.item_types.length + 1);
                let table_row_index = parseInt(index) + 2;
                edit_delete_cell.appendChild(created_edit_button(table_row_index, item.auto_increment_id));
                edit_delete_cell.appendChild(created_delete_button(item.auto_increment_id));
            });

            render_pagination();
        }
    }
    function clean_pagination() {
        let jgrid_pagination_container = this.table_instance.nextSibling;//for one or more table
        if (jgrid_pagination_container != null && jgrid_pagination_container != 'undefined' && jgrid_pagination_container.className == "jgrid-pagination-container") {
            while (jgrid_pagination_container.firstChild) {
                jgrid_pagination_container.removeChild(jgrid_pagination_container.firstChild);
            }
            jgrid_pagination_container.remove();
        }
    }
    function render_pagination() {
        clean_pagination();
        if (this.is_pagination == true) {
            if (this.data.length > this.page_size) {
                let jgrid_pagination_container = document.createElement('div');
                jgrid_pagination_container.className = 'jgrid-pagination-container';
                let jgrid_pagination = document.createElement('div');
                jgrid_pagination.className = 'jgrid-pagination';
                let total_page_number = Math.ceil(this.data.length / this.page_size);
                for (let i = 1; total_page_number >= i; i++) {
                    let jgrid_pagination_item = document.createElement('li');
                    jgrid_pagination_item.className = 'jgrid-pagination-item';
                    let jgird_pagination_item_link = document.createElement('a');
                    jgird_pagination_item_link.className = 'jgird-pagination-item-link';
                    jgird_pagination_item_link.innerHTML = i;
                    jgird_pagination_item_link.href = '';
                    jgird_pagination_item_link.onclick = function (e) {
                        e.preventDefault();
                        this.current_page_number = i;
                        render_table_rows();
                    }
                    if (this.current_page_number == i) {
                        jgird_pagination_item_link.className += " " + 'pagination-link-active';
                    }
                    jgrid_pagination_item.appendChild(jgird_pagination_item_link);

                    jgrid_pagination.appendChild(jgrid_pagination_item);

                }
                jgrid_pagination_container.appendChild(jgrid_pagination);
                this.table_instance.after(jgrid_pagination_container);
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
        switch (item.data_type) {
            case 'text':
                input = document.createElement('input');
                input.type = 'text';
                input.className = item.input_class_name;
                break;
            case 'date':
                input = document.createElement('input');
                input.type = 'date';
                input.className = item.input_class_name;
                break;
            case 'email':
                input = document.createElement('input');
                input.type = 'email';
                input.className = item.input_class_name;
                break;
            default:
                input = document.createElement('input');
                input.type = 'text';
                input.className = item.input_class_name;
        }
        input.id = item.name;
        input.name = item.name;
        return input;
    }
}

