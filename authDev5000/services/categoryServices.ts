const { CategoryModel } = require('../typegoouseClasses/category');

const createNewCategory = (payload) => {
  return CategoryModel.create(payload);
};
const find = (payload) => {
  return CategoryModel.find(payload);
};
const getCategory = (categoryName) => {
  return find({ name: categoryName })
    .populate('todos')
    .then((category) => {
      if (!category) {
        return false;
      }
      return category;
    })
    .catch((err) => {
      if (err) {
        return err;
      }
    });
};
const categoryAddNewTodo = (categoryName, id) => {
  return find({ name: categoryName }).then((category) => {
    category[0].todos.push(id);
    category[0].save();
    return category[0];
  });
};
export {
  find,
  createNewCategory,
  getCategory,
  categoryAddNewTodo,
};
