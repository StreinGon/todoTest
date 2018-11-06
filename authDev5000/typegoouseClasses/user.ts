import { prop, Typegoose, Ref, arrayProp } from 'typegoose';
import { Image } from './image';
import { Role } from './role';
import { Todo } from './todo';
import { SharedTodos } from './sharedTodos';

class User extends Typegoose {
    @prop()
    username: String;
    @prop()
    mail: String;
    @prop()
    password: String;
    @prop({ ref: Image })
    avatar: Ref<Image>;
    @prop({ ref: Role })
    role: Ref<Role>;
    @arrayProp({ itemsRef: Todo })
    todos: Ref<Todo>;
    @prop({ default: Date.now })
    createdAt: Date;
    @prop({ ref: SharedTodos })
    invite: Ref<SharedTodos>;
}
const UserModel = new User().getModelForClass(User);

export { UserModel, User }