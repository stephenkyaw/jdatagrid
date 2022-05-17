# jdatagrid
javascript data grid entry library

**features**
 - crud operation :heavy_check_mark:
 - validation :x:
 - sorting :x:
 - searching :x:
 - pagination :heavy_check_mark:

[![pages-build-deployment](https://github.com/kyawmyoaung-dev/jdatagrid/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main)](https://github.com/kyawmyoaung-dev/jdatagrid/actions/workflows/pages/pages-build-deployment)
 
:point_right: :link: [Demo Example](https://kyawmyoaung-dev.github.io/jdatagrid/publish) :grin:
 


**html**
```
<table id="jgrid" class="table"></table>
```
 **javascript**
 ```
document.addEventListener('DOMContentLoaded', function () {

            let jgrid = document.querySelector('#jgrid').jgrid(
                {
                    item_types:
                        [
                            { name: 'name', header_text: 'Name', data_type: 'text', input_class_name: 'form-control' },
                            { name: 'date_of_birth', header_text: 'DOB', data_type: 'date', input_class_name: 'form-control' },
                            { name: 'email', header_text: 'Email', data_type: 'email', input_class_name: 'form-control' },
                            { name: 'city', header_text: 'City', data_type: 'text', input_class_name: 'form-control', is_show: false }
                        ],
                    is_pagination: false,
                    page_size: 3,
                });
 });
 ```
 **check log**
```
  btn_submit.addEventListener('click', function () {
            console.log(jgrid);
});
```

 **jgrid object log**

```
{
    "item_types": [
        {
            "name": "name",
            "header_text": "Name",
            "data_type": "text",
            "input_class_name": "form-control",
            "is_show": true,
            "is_sort": true,
            "is_search": true
        },
        {
            "name": "date_of_birth",
            "header_text": "DOB",
            "data_type": "date",
            "input_class_name": "form-control",
            "is_show": true,
            "is_sort": true,
            "is_search": true
        },
        {
            "name": "email",
            "header_text": "Email",
            "data_type": "email",
            "input_class_name": "form-control",
            "is_show": true,
            "is_sort": true,
            "is_search": true
        },
        {
            "name": "city",
            "header_text": "City",
            "data_type": "text",
            "input_class_name": "form-control",
            "is_show": false,
            "is_sort": true,
            "is_search": true
        }
    ],
    "is_pagination": false,
    "page_size": 3,
    "table_instance": {},
    "data": [
        {
            "name": "kma",
            "date_of_birth": "2022-05-15",
            "email": "kma@gmail.com",
            "city": "yangon",
            "auto_increment_id": 1
        },
        {
            "name": "john",
            "date_of_birth": "2022-05-16",
            "email": "john@gmail.com",
            "city": "mandalay",
            "auto_increment_id": 2
        },
        {
            "name": "may",
            "date_of_birth": "2022-05-17",
            "email": "may@gmail.com",
            "city": "yangon",
            "auto_increment_id": 3
        }
    ]
}
```
