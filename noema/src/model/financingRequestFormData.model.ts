export interface FinancingRequestFormData {
  name: string;
  surname: string;
  country: string;
  projectCode: string;
  validityPeriodStart: Date | null;
  validityPeriodEnd: Date | null;
  description: string;
  paymentAmount: number;
  currency: string;
}
