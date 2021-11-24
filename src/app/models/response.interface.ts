import { IEmployee } from './employee.interface';
import { IUser } from './user.interface';

export interface Res {
  success: boolean;
  message?: string;
  data?: number | Array<IEmployee> | IEmployee | IUser | string;
}
