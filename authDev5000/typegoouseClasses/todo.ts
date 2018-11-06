import { prop, Typegoose, Ref, arrayProp } from 'typegoose';
import { Image } from './image';
import { User } from './user';
import { Priority } from './priority';
class Todo extends Typegoose {
    @prop()
    todoName: String
    @prop()
    task: String
    @prop()
    success: Boolean
    @arrayProp({ itemsRef: Image })
    image: Ref<Image>;
    @prop()
    category: String;
    @prop({ ref: User })
    todoOwner: Ref<User>;
    @prop({ ref: Priority })
    priority: Ref<Priority>;
    @prop()
    timeTracking: {
        investigation: Number,
        onFact: Number,
    };
    @prop()
    status: String;
    @prop()
    dates: {
        start: Date,
        end: Date,
    };
    @prop({ default: Date.now })
    createdAt: Date;
}
const TodoModel = new Todo().getModelForClass(Todo);

export { TodoModel, Todo }