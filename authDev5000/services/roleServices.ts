
import { IRole } from '../interfaces/role';
const { RoleModel } = require('../models/role');

function createRoleOfUser(rights: number): IRole {
  return new RoleModel({
    rights,

  });
}
export { createRoleOfUser };
