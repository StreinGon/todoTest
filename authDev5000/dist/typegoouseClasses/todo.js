"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("typegoose");
const image_1 = require("./image");
const user_1 = require("./user");
const priority_1 = require("./priority");
class Todo extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Todo.prototype, "todoName", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Todo.prototype, "task", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], Todo.prototype, "success", void 0);
__decorate([
    typegoose_1.arrayProp({ itemsRef: image_1.Image }),
    __metadata("design:type", Object)
], Todo.prototype, "image", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Todo.prototype, "category", void 0);
__decorate([
    typegoose_1.prop({ ref: user_1.User }),
    __metadata("design:type", Object)
], Todo.prototype, "todoOwner", void 0);
__decorate([
    typegoose_1.prop({ ref: priority_1.Priority }),
    __metadata("design:type", Object)
], Todo.prototype, "priority", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], Todo.prototype, "timeTracking", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], Todo.prototype, "status", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Object)
], Todo.prototype, "dates", void 0);
__decorate([
    typegoose_1.prop({ default: Date.now }),
    __metadata("design:type", Date)
], Todo.prototype, "createdAt", void 0);
exports.Todo = Todo;
const TodoModel = new Todo().getModelForClass(Todo);
exports.TodoModel = TodoModel;
//# sourceMappingURL=todo.js.map