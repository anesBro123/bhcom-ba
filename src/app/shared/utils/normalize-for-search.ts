const DIACRITIC_MAP: Record<string, string> = {
  č: 'c',
  ć: 'c',
  š: 's',
  ž: 'z',
  đ: 'd',
  Č: 'c',
  Ć: 'c',
  Š: 's',
  Ž: 'z',
  Đ: 'd',
};

export function normalizeForSearch(value: string): string {
  let normalized = value.trim().toLowerCase();

  for (const [diacritic, ascii] of Object.entries(DIACRITIC_MAP)) {
    normalized = normalized.replaceAll(diacritic, ascii);
  }

  return normalized.normalize('NFD').replace(/\p{M}/gu, '');
}
