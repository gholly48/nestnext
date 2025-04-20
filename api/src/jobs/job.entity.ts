import { BaseEntity } from '../common/base.entity';

export interface Job extends BaseEntity {
  title: string;
  description: string;
  category: string;
  location: string;
  website: string | null;
  authorId: number;
}
