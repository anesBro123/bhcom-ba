export const WAREHOUSE_TYPE_OPTIONS = [
  { value: 'open', labelKey: 'portal.admin.features.warehouses.form.warehouseType.open' },
  { value: 'closed', labelKey: 'portal.admin.features.warehouses.form.warehouseType.closed' },
] as const;

/** Future HTTP endpoint — swap service implementation when API is ready. */
export const ADMIN_WAREHOUSES_API = '/api/admin/warehouses';
