import { BaseDbModel } from './base-db-model';
import { Employee } from './employee';
import { WorkType } from './work-type';

export interface Work extends BaseDbModel {
  employees: Employee[];
  workType: WorkType;
  startDate: Date;
  plannedEndDate: Date;
  additionalPayment: number;
}
