# jdatagrid
javascript data grid entry library

**features**
 - crud operation :heavy_check_mark:
 - validation :heavy_check_mark:
 - sorting :heavy_check_mark:
 - searching :x:
 - pagination :heavy_check_mark:

[![pages-build-deployment](https://github.com/kyawmyoaung-dev/jdatagrid/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main)](https://github.com/kyawmyoaung-dev/jdatagrid/actions/workflows/pages/pages-build-deployment)
 
:point_right: :link: [Demo Example](https://kyawmyoaung-dev.github.io/jdatagrid/) :grin:
  
**html**
```
 <table id="jgrid" class="table table-bordered"></table>
```
 **javascript**
 ```
document.addEventListener('DOMContentLoaded', function () {
            jdatagrid = new jgrid(
                {
                    table: '#jgrid',
                    items:
                        [
                            { name: 'name', input_type: 'text', header_text: 'Name', attributes: [{ name: 'class', value: 'form-control' }, { name: 'data-name', value: 'data-value' }] },
                            { name: 'date_of_birth', input_type: 'date', header_text: 'Date of birth', attributes: [{ name: 'class', value: 'form-control' }] },
                            { name: 'gender', input_type: 'radio', header_text: 'Gender', data: [{ text: 'Male', value: 'M' }, { text: 'Female', value: 'F' }] },
                            { name: 'status', input_type: 'checkbox', header_text: 'Status' },
                            { name: 'subjects', input_type: 'checkbox', header_text: 'Subjects', data: [{ text: 'Html', value: 'html' }, { text: 'CSS', value: 'css' }, { text: 'Javascript', value: 'javascript' }] },
                            { name: 'class', input_type: 'select', header_text: 'Class', attributes: [{ name: 'class', value: 'form-control' }], data: [{ text: 'Class A', value: 'class_a' }, { text: 'Class B', value: 'class_b' }, { text: 'Class C', value: 'class_c' }] }
                        ],
                    is_pagination: true,
                    page_size: 10
                }
            );
        });
 ```
  **input_type**
 ```
 color
 date
 datetime-local
 month
 number
 password
 search
 tel
 text
 time
 url
 week
 range
 url
 select (return data object)
 checkbox (return data object or boolean)
 radio (return data object or boolean)

 ```
 **data object (array)**
 ```
 data : [{ text : 'text field', value : 'value field' }]
 ```
 **attributes (array)**
 ```
 attributes :[{ name : 'attribute_name', value : 'attribute_value' }]
 ```
 **get data**
```
 btn_submit.addEventListener('click', function () {            
            result.innerHTML = '';
            let data = jdatagrid.get_data();
            result.innerHTML = JSON.stringify(data);
            console.log('jdatagrid data log', data);
        });
```

 **data object log**

```
[{
		"name": "John",
		"date_of_birth": "1991-12-30",
		"gender": [{
			"text": "Male",
			"value": "M"
		}],
		"status": true,
		"subjects": [{
				"text": "Html",
				"value": "html"
			},
			{
				"text": "CSS",
				"value": "css"
			},
			{
				"text": "Javascript",
				"value": "javascript"
			}
		],
		"class": [{
			"text": "Class A",
			"value": "class_a"
		}],
		"auto_increment_id": 1
	},
	{
		"name": "May",
		"date_of_birth": "1989-06-14",
		"gender": [{
			"text": "Female",
			"value": "F"
		}],
		"status": false,
		"subjects": [{
			"text": "Html",
			"value": "html"
		}],
		"class": [{
			"text": "Class B",
			"value": "class_b"
		}],
		"auto_increment_id": 2
	},
	{
		"name": "David",
		"date_of_birth": "1988-10-20",
		"gender": [{
			"text": "Male",
			"value": "M"
		}],
		"status": true,
		"subjects": [{
				"text": "Html",
				"value": "html"
			},
			{
				"text": "CSS",
				"value": "css"
			},
			{
				"text": "Javascript",
				"value": "javascript"
			}
		],
		"class": [{
			"text": "Class C",
			"value": "class_c"
		}],
		"auto_increment_id": 3
	}
]
```
