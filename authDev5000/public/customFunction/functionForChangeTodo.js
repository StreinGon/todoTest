const { validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");

const Todos = require("../dbModels/todoModel");
const secret = new Buffer("1", "base64");
const customResponse = require("../customResponse");

const functionForChangeTodo = function(req, res) {
  
  const token = req.cookies.Authorization;
  const currentUser = jwt.verify(token, secret);
  const id = currentUser._id;
  const title = req.body.title;
  const status=req.body.success;
  const newDesc = req.body.description;
  let changedTodos=null;
  return Todos.find({ todoOwner: id,todoName:title }, function(err, todos) {
    todos.forEach(todo => {
    
        if(newDesc!=null&&newDesc!=undefined){
          todo.task = newDesc;
          changedTodos = todo;
        }
        if(status==="true" || status==="false"){
          todo.success = status;
          changedTodos = todo;
        }
        todo.save();
   
      
    });
    if(changedTodos!==null){
      return customResponse(res, 200, "todo changed", changedTodos);
    }
    return customResponse(res, 200, "Todo not found");
  });
  
};
module.exports = functionForChangeTodo;
