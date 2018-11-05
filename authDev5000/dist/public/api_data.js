define({ "api": [
        {
            "type": "get",
            "url": "/admin",
            "title": "Todos of  users",
            "group": "Admin",
            "success": {
                "examples": [
                    {
                        "title": "Success",
                        "content": "{\n    \"message\": \"Todo list of user\",\n    \"data\": {\n        \"todoList\": []\n    },\n    \"responseTime\": \"10/30/2018 17:46\"\n}",
                        "type": "json"
                    }
                ]
            },
            "error": {
                "examples": [
                    {
                        "title": "Error",
                        "content": "    422 Unauthorized\n{\n    \"message\": \"You must login as admin\",\n    \"responseTime\": \"10/30/2018 17:27\"\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "routes/admin.js",
            "groupTitle": "Admin",
            "name": "GetAdmin"
        },
        {
            "type": "get",
            "url": "/admin/users",
            "title": "User list for admin",
            "group": "Admin",
            "success": {
                "examples": [
                    {
                        "title": "Success",
                        "content": "{\n    \"message\": \"UsersList\",\n    \"data\": [\n        {\n            \"todos\": [\n                \"5bd869012f04b519b42a7a7d\"\n            ],\n            \"_id\": \"5bd867f975d51114087b2049\",\n            \"username\": \"testetA\",\n            \"password\": \"$2b$10$A9fXfS1l2JHEWIrv6S3wVuX0hDgL2FWcgwxI3cohN8vidqiAnD3ES\",\n            \"mail\": \"teste2r@mail.con\",\n            \"role\": \"5bd867f975d51114087b2048\",\n            \"__v\": 1\n        }\n    ],\n    \"responseTime\": \"10/30/2018 17:41\"\n}",
                        "type": "json"
                    }
                ]
            },
            "error": {
                "examples": [
                    {
                        "title": "Error",
                        "content": "    422 Unauthorized\n{\n    \"message\": \"You must login as admin\",\n    \"responseTime\": \"10/30/2018 17:27\"\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "routes/admin.js",
            "groupTitle": "Admin",
            "name": "GetAdminUsers"
        },
        {
            "type": "post",
            "url": "/admin",
            "title": "Change todo owner",
            "group": "Admin",
            "success": {
                "examples": [
                    {
                        "title": "Success",
                        "content": "{\n    \"message\": \"Todo updated\",\n    \"data\": { },\n    \"responseTime\": \"10/30/2018 17:43\"\n}",
                        "type": "json"
                    }
                ]
            },
            "error": {
                "examples": [
                    {
                        "title": "Error",
                        "content": "    422 Unauthorized\n{\n    \"message\": \"You must login as admin\",\n    \"responseTime\": \"10/30/2018 17:27\"\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "routes/admin.js",
            "groupTitle": "Admin",
            "name": "PostAdmin"
        },
        {
            "type": "get",
            "url": "/image/:imagename",
            "title": "Image Get single image",
            "group": "Image",
            "version": "0.0.0",
            "filename": "routes/image.js",
            "groupTitle": "Image",
            "name": "GetImageImagename"
        },
        {
            "type": "delete",
            "url": "/todo",
            "title": "delete single todo",
            "group": "Todo",
            "success": {
                "examples": [
                    {
                        "title": "Success",
                        "content": "{\n   \"msg\": \"todo deleted\"\n}",
                        "type": "json"
                    }
                ]
            },
            "error": {
                "examples": [
                    {
                        "title": "Error",
                        "content": "{\n   \"msg\": \"Not found\"\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "routes/todo.js",
            "groupTitle": "Todo",
            "name": "DeleteTodo"
        },
        {
            "type": "get",
            "url": "/todo",
            "title": "Get single todo",
            "group": "Todo",
            "success": {
                "examples": [
                    {
                        "title": "Success",
                        "content": "{\n \"msg\": \"Todo sended\",\n \"data\": {\n      \"_id\": \"5bcde5fd2b4e3b1d5890978a\",\n     \"todoName\": \"123245\",\n     \"task\": \"122345\",\n     \"success\": false,\n     \"todoOwner\": \"5bc9dea3ef3a9931386555c1\",\n    \"__v\": 0\n }\n}",
                        "type": "json"
                    }
                ]
            },
            "error": {
                "examples": [
                    {
                        "title": "Error",
                        "content": "{\n   \"msg\": \"Not found\"\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "routes/todo.js",
            "groupTitle": "Todo",
            "name": "GetTodo"
        },
        {
            "type": "post",
            "url": "/todo",
            "title": "Change single todo",
            "group": "Todo",
            "success": {
                "examples": [
                    {
                        "title": "Success",
                        "content": "{\n \"msg\": \"todo changed\",\n \"data\": {\n     \"_id\": \"5bcde5fd2b4e3b1d5890978a\",\n     \"todoName\": \"123245\",\n     \"task\": \"122345\",\n     \"success\": true,\n     \"todoOwner\": \"5bc9dea3ef3a9931386555c1\",\n     \"__v\": 0\n }\n}",
                        "type": "json"
                    }
                ]
            },
            "error": {
                "examples": [
                    {
                        "title": "Error",
                        "content": "{\n \"msg\": \"Todo not found\"\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "routes/todo.js",
            "groupTitle": "Todo",
            "name": "PostTodo"
        },
        {
            "type": "post",
            "url": "/todo/imageAdd/:id",
            "title": "Add image to todo",
            "group": "Todo",
            "success": {
                "examples": [
                    {
                        "title": "Success",
                        "content": " {\n    \"message\": \"Todo updated\",\n    \"data\": [\n        {\n            \"image\": [\n                \"5bd869012f04b519b42a7a7a\",\n                \"5bd869012f04b519b42a7a7b\",\n                \"5bd86b94730c912db4b2e8b5\",\n                \"5bd86b94730c912db4b2e8b6\",\n                \"5bd86bc3e589992ea0985efd\",\n                \"5bd86bc3e589992ea0985efe\",\n                \"5bd86be73328a12ebc85684e\",\n                \"5bd86be73328a12ebc85684f\",\n                \"5bd86bec3328a12ebc856850\",\n                \"5bd86bec3328a12ebc856851\",\n                \"5bd86bec3328a12ebc856852\",\n                \"5bd86bec3328a12ebc856853\",\n                \"5bd86bed3328a12ebc856854\",\n                \"5bd86bed3328a12ebc856855\"\n            ],\n            \"_id\": \"5bd869012f04b519b42a7a7d\",\n            \"todoName\": \"assssssAF\",\n            \"task\": \"assssssAF\",\n            \"success\": false,\n            \"todoOwner\": \"5bd867f975d51114087b2049\",\n            \"priority\": \"5bd869012f04b519b42a7a7c\",\n            \"__v\": 5\n        }\n    ],\n    \"responseTime\": \"10/30/2018 17:34\"\n}",
                        "type": "json"
                    }
                ]
            },
            "error": {
                "examples": [
                    {
                        "title": "Error",
                        "content": "{\n    \"message\": \"Not found\",\n    \"responseTime\": \"10/30/2018 17:37\"\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "routes/todo.js",
            "groupTitle": "Todo",
            "name": "PostTodoImageaddId"
        },
        {
            "type": "put",
            "url": "/todo",
            "title": "Add single todo",
            "group": "Todo",
            "success": {
                "examples": [
                    {
                        "title": "Success",
                        "content": "\n{\n \"msg\": \"todo created\",\n \"data\": {\n      \"_id\": \"5bcde5fd2b4e3b1d5890978a\",\n     \"todoName\": \"123245\",\n     \"task\": \"122345\",\n     \"success\": false,\n     \"todoOwner\": \"5bc9dea3ef3a9931386555c1\",\n    \"__v\": 0\n }\n}",
                        "type": "json"
                    }
                ]
            },
            "error": {
                "examples": [
                    {
                        "title": "Error",
                        "content": "{\n\"msg\": \"Task with your title is already being performed,Task with your description is already being performed\"\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "routes/todo.js",
            "groupTitle": "Todo",
            "name": "PutTodo"
        },
        {
            "type": "get",
            "url": "/todos",
            "title": "List all todo",
            "group": "Todos",
            "success": {
                "examples": [
                    {
                        "title": "Success",
                        "content": "200 Registration successfull\n{\n  \"msg\": \"Registration succesfull\"\n}",
                        "type": "json"
                    }
                ]
            },
            "error": {
                "examples": [
                    {
                        "title": "Error",
                        "content": "   422 Validation error\n{\n  \"msg\": \"Password must be at least 5 chars long,E-mail already in use\"\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "routes/registerform.js",
            "groupTitle": "Todos",
            "name": "GetTodos"
        },
        {
            "type": "get",
            "url": "/todos",
            "title": "List all todo",
            "group": "Todos",
            "success": {
                "fields": {
                    "Success 200": [
                        {
                            "group": "Success 200",
                            "type": "Object[]",
                            "optional": false,
                            "field": "todos",
                            "description": "<p>Todo's list</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Integer",
                            "optional": false,
                            "field": "countAllTodo",
                            "description": "<p>Count of user's todo</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Integer",
                            "optional": false,
                            "field": "amount",
                            "description": "<p>requsted amount</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Integer",
                            "optional": false,
                            "field": "startForm",
                            "description": "<p>requsted startFrom</p>"
                        },
                        {
                            "group": "Success 200",
                            "type": "Integer",
                            "optional": false,
                            "field": "Role",
                            "description": "<p>Role of user</p>"
                        }
                    ]
                },
                "examples": [
                    {
                        "title": "Success",
                        "content": "   200 Login as user\n{\n  \"message\": \"Log in as user\",\n  \"data\": {\n      \"todoList\": [\n          {\n              \"image\": [\n                 \"5bd8606adf3e0031609c725d\",\n                  \"5bd8606adf3e0031609c725e\"\n              ],\n               \"_id\": \"5bd8606adf3e0031609c7260\",\n               \"todoName\": \"asssassafasfas\",\n               \"task\": \"sassasaasfasfs\",\n               \"success\": false,\n               \"todoOwner\": \"5bd86057df3e0031609c725c\",\n               \"priority\": {\n                   \"_id\": \"5bd8606adf3e0031609c725f\",\n                   \"value\": 1,\n                   \"__v\": 0\n               },\n               \"__v\": 0\n           }\n      ],\n       \"UserRole\": 0\n   },\n   \"responseTime\": \"10/30/2018 16:45\"\n}",
                        "type": "json"
                    }
                ]
            },
            "error": {
                "examples": [
                    {
                        "title": "Error",
                        "content": "401 Unauthorized",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "routes/todos.js",
            "groupTitle": "Todos",
            "name": "GetTodos"
        },
        {
            "type": "post",
            "url": "/users/login",
            "title": "Login",
            "group": "Users",
            "success": {
                "fields": {
                    "Success 200": [
                        {
                            "group": "Success 200",
                            "type": "String",
                            "optional": false,
                            "field": "data",
                            "description": "<p>JWT Token</p>"
                        }
                    ]
                },
                "examples": [
                    {
                        "title": "Success",
                        "content": "{\n   \"msg\": \"Login correct\",\n   \"data\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmM5ZGVhM2VmM2E5OTMxMzg2NTU1YzEiLCJ1c2VybmFtZSI6Im9yaXZpZGVyY2hpIiwibWFpbCI6InRlc3RtYWlsQGdtYWlsLmNvbSIsInJvbGUiOiI1YmM5ZGVhM2VmM2E5OTMxMzg2NTU1YzAiLCJpYXQiOjE1NDAyMTk2NDMsImV4cCI6MTU0MjgxMTY0M30.wvGk6k1NSP38rrTvetI-eaRImNOPAEsuIPWelmtNzm8\"\n}",
                        "type": "json"
                    }
                ]
            },
            "error": {
                "examples": [
                    {
                        "title": "Error",
                        "content": "    404 Unauthorized\n{\n \"msg\": \"Login incorrect\"\n }",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "routes/login.js",
            "groupTitle": "Users",
            "name": "PostUsersLogin"
        },
        {
            "type": "post",
            "url": "/users/logout",
            "title": "Logout",
            "group": "Users",
            "success": {
                "examples": [
                    {
                        "title": "Success",
                        "content": "200 Logout\n{\n \"msg\": \"LogOut\"\n}",
                        "type": "json"
                    }
                ]
            },
            "version": "0.0.0",
            "filename": "routes/users.js",
            "groupTitle": "Users",
            "name": "PostUsersLogout"
        }
    ] });
//# sourceMappingURL=api_data.js.map