import { BaseDbModel } from './base-db-model';

export interface Employee extends BaseDbModel {
  lastName: string;
  firstName: string;
  middleName: string;
  salary: number;
}
