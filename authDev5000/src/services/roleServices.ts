
import { IRole } from '@src/interfaces/role';
import { RoleModel } from '@src/models/role';

export function createRoleOfUser(rights: number): IRole {
  return new RoleModel({
    rights,
  });
}
