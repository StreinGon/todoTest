"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const userServices = require("./userServices");
const todo_1 = require("@src/models/todo");
const transporter_1 = require("@src/configs/transporter");
const otherConstants_1 = require("@src/constants/otherConstants");
exports.createNewTodo = (payload) => {
    const todo = new todo_1.TodoModel(payload);
    todo.save();
    return todo;
};
exports.deleteTodo = (id, idTodo) => {
    return exports.find({ todoOwner: id, _id: idTodo }).then((todo) => {
        if (!todo || todo.length < 1) {
            return null;
        }
        todo[0].remove();
        return todo[0].image[0];
    });
};
exports.find = (payload) => {
    return todo_1.TodoModel.find(payload);
};
exports.findAll = (payload) => {
    return todo_1.TodoModel.find(payload);
};
exports.transporter = nodemailer_1.createTransport(transporter_1.transporterConfig);
exports.changeTodosAsAdmin = (idTodo, idUser) => {
    return exports.find({ _id: idTodo })
        .then((todo) => {
        if (!todo) {
            return null;
        }
        if (idUser != null && idUser !== undefined) {
            return userServices.find({ _id: todo[0].todoOwner }).then((user) => {
                if (!user) {
                    return null;
                }
                user.todos.splice(user.todos.indexOf(idTodo), 1);
                user.save();
                const mailOptions = {
                    from: 'admin',
                    to: user.mail,
                    subject: 'Todo',
                    text: String('You get new todo'),
                };
                return userServices.find({ _id: idUser }).then((usernext) => {
                    usernext.todos.push(idTodo);
                    todo[0].todoOwner = idUser;
                    todo[0].save();
                    usernext.save();
                    return exports.transporter.sendMail(mailOptions).then((info) => {
                        if (!info) {
                            return null;
                        }
                        return todo[0];
                    });
                });
            });
        }
        return null;
    })
        .catch((err) => {
        if (err)
            return err;
    });
};
exports.changeTodos = (payload) => {
    return exports.find({ todoOwner: payload.id, _id: payload.idTodo })
        .then((todo) => {
        if (!todo || todo.length < 1) {
            return null;
        }
        if (payload.newDesc != null &&
            payload.newDesc !== undefined &&
            payload.newDesc.length > 4) {
            todo[0].task = payload.newDesc;
        }
        if (payload.success === 'true' || payload.success === 'false') {
            todo[0].success = payload.success;
        }
        if (payload.onFact) {
            todo[0].timeTracking.onFact = payload.onFact;
        }
        if (todo[0].status !== otherConstants_1.TODO.status.ended && payload.status === otherConstants_1.TODO.status.started) {
            todo[0].status = payload.status;
            todo[0].dates.start = new Date();
        }
        if (todo[0].status !== otherConstants_1.TODO.status.ended && payload.status === otherConstants_1.TODO.status.ended) {
            todo[0].status = payload.status;
            todo[0].dates.end = new Date();
        }
        if (todo[0].status !== otherConstants_1.TODO.status.ended && payload.status) {
            todo[0].status = payload.status;
        }
        todo[0].save();
        return todo[0];
    })
        .catch((err) => {
        if (err)
            return err;
    });
};
exports.getTodo = (id, idTodo) => {
    return exports.find({ todoOwner: id, _id: idTodo })
        .then((todo) => {
        if (!todo) {
            return null;
        }
        return todo;
    })
        .catch((err) => {
        if (err) {
            return err;
        }
    });
};
//# sourceMappingURL=todoServices.js.map