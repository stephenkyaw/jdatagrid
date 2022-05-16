import { item_config, default_config  } from "./configs/configs.js"

class jdatagrid {
  data: any;
  table: string;
  items: Array<item_config>;
  is_pagination;
  page_size;
  current_page;

  constructor(default_config) {
    this.table = default_config.table;
    this.items = default_config.items;
    this.is_pagination = default_config.is_pagination;
    this.page_size = default_config.page_size;
    this.current_page = default_config.page_size;
  }

  public log() {
    console.log("table");
    console.log(this.table);
    console.log("items");
    console.log(this.items);
  }

  public get_data(): any {
    return this.data;
  }
}