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