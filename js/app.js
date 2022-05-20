(function () {
    // let name;
    // function config(_name) {
    //     this.name = _name;
    // }
    // function get_name() {
    //     return this.name;
    // }

    // class user {
    //     name;
    //     constructor(_name) {
    //         this.name = _name;
    //     }

    //     get_name = () => {
    //         return this.name;
    //     }
    // }
    function user(_name){
        this.name = _name;
        
        this.get_name = function(){
            return this.name;
        }
    }
    module.exports = { user };
})();
