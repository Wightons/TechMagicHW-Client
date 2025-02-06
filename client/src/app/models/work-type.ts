import { BaseDbModel } from './base-db-model';

export interface WorkType extends BaseDbModel {
  description: string;
  dailyRate: number;
}
