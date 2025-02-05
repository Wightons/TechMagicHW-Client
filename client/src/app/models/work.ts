export interface Work {
  _id: string;
  employees: unknown[];
  workType: unknown;
  startDate: Date;
  plannedEndDate: Date;
  additionalPayment: number;
}
