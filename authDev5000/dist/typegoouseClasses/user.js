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
const role_1 = require("./role");
const todo_1 = require("./todo");
const sharedTodos_1 = require("./sharedTodos");
class User extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "mail", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_1.prop({ ref: image_1.Image }),
    __metadata("design:type", Object)
], User.prototype, "avatar", void 0);
__decorate([
    typegoose_1.prop({ ref: role_1.Role }),
    __metadata("design:type", Object)
], User.prototype, "role", void 0);
__decorate([
    typegoose_1.arrayProp({ itemsRef: todo_1.Todo }),
    __metadata("design:type", Object)
], User.prototype, "todos", void 0);
__decorate([
    typegoose_1.prop({ default: Date.now }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typegoose_1.prop({ ref: sharedTodos_1.SharedTodos }),
    __metadata("design:type", Object)
], User.prototype, "invite", void 0);
exports.User = User;
const UserModel = new User().getModelForClass(User);
exports.UserModel = UserModel;
//# sourceMappingURL=user.js.map