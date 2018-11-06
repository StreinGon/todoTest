import { arrayProp, Typegoose, Ref } from 'typegoose';
import { Todo } from './todo';
// import { User } from './user';



class SharedTodos extends Typegoose {
    @arrayProp({ itemsRef: Todo })
    todos: Ref<Todo>;
    // @arrayProp({ itemsRef: User })
    // allowed: Ref<User>;
}
const SharedTodosModel = new SharedTodos().getModelForClass(SharedTodos);

export { SharedTodosModel, SharedTodos }
