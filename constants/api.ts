export const API_ENDPOINTS = {
  FOUR_DAY_OUTLOOK: '/four-day-outlook',
} as const;

export const API_ERROR_MESSAGES = {
  INVALID_DATE: 'Invalid date format. Date format must be YYYY-MM-DD (2024-06-01) or YYYY-MM-DDTHH:mm:ss (2024-06-01T08:30:00).',
  INVALID_PAGINATION: 'Invalid pagination token.',
  DATA_NOT_FOUND: 'Data not found',
} as const;

export const API_STATUS_CODES = {
  SUCCESS: 0,
  ERROR_PARAMS: 4,
  DATA_NOT_FOUND: 17,
} as const; 