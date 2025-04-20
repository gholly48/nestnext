import { BaseEntity } from '../common/base.entity';

export interface User extends BaseEntity {
  email:    string;
  password: string;
  phone?:   string;
  role:     string;
}
