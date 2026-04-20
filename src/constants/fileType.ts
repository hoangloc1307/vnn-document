export const FILE_EXTENSION = {
  XLSX: {
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    exts: ['.xlsx'],
  },
  XLS: {
    mime: 'application/vnd.ms-excel',
    exts: ['.xls'],
  },
  CSV: {
    mime: 'text/csv',
    exts: ['.csv'],
  },
} as const;

export type FILE_EXTENSION = keyof typeof FILE_EXTENSION;

export const IMPORT_ACCEPT = Object.values(FILE_EXTENSION).reduce(
  (acc, item) => {
    acc[item.mime] = [...item.exts];
    return acc;
  },
  {} as Record<string, string[]>,
);
