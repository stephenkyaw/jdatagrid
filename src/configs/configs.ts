export class item_config {
  name: string;
  header_text?: string;
  data_type?: string;
  input_type: string;
}

export class default_config {
  table: string;
  items: Array<item_config>;
  is_pagination: boolean = true;
  page_size: number = 5;
  current_page: number = 1;
}
