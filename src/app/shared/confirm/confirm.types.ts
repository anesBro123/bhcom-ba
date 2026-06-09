export interface ConfirmOptions {
  titleKey: string;
  messageKey: string;
  confirmLabelKey?: string;
  cancelLabelKey?: string;
  danger?: boolean;
  messageParams?: Record<string, unknown>;
}

export interface ResolvedConfirmOptions {
  titleKey: string;
  messageKey: string;
  confirmLabelKey: string;
  cancelLabelKey: string;
  danger: boolean;
  messageParams?: Record<string, unknown>;
}

export interface ActiveConfirmRequest {
  options: ResolvedConfirmOptions;
  resolve: (confirmed: boolean) => void;
}
