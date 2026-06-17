export const DEMO_COMPANY_ID = 'company-demo';
export const EXTERNAL_COMPANY_ID = 'company-other';

export function belongsToCompany(entity: { companyId: string }, companyId: string): boolean {
  return entity.companyId === companyId;
}

export function isExternalToCompany(entity: { companyId: string }, companyId: string): boolean {
  return entity.companyId !== companyId;
}
