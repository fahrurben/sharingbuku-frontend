import { useTranslation } from 'react-i18next';

export const API_URL = process.env.REACT_APP_API_URL;
export const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
export const AUTH_FULL_NAME_KEY = 'FULL_NAME';

// 'idle' | 'loading' | 'succeeded' | 'failed'
export const IDLE = 'idle';
export const LOADING = 'loading';
export const SUCCEEDED = 'succeeded';
export const FAILED = 'failed';

export const YES = 'Yes';
export const NO = 'No';

export const DATE_DISPLAY_FORMAT = 'D MMM YYYY';

export const STATUS_REQUEST = 0;
export const STATUS_APPROVED = 1;
export const STATUS_CANCELLED = 2;
export const STATUS_REJECTED = 3;
export const STATUS_SENDING = 4;
export const STATUS_RECEIVED = 5;
export const STATUS_SENDING_BACK = 6;
export const STATUS_RECEIVED_BACK = 7;

export const STATUS_LABEL = [
  'Requesting'
];

