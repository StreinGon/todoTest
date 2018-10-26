define({ "api": [
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
          "content": "200 Login as user\n{\n  \"message\": \"Log in as user\",\n  \"data\": {\n         \"todos\": []\n         \"countAlltodo\": 4,\n         \"startFrom\": 3,\n         \"amount\": 1,\n         \"UserRole\": 0\n  }\n}",
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
