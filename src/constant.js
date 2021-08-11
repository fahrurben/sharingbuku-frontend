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
  'Requested',
  'Approved',
  'Cancelled',
  'Rejected',
  'Sending',
  'Received',
  'Sending Back',
  'Received Back',
];

export const RESOLUTION_LABEL = [
  'None',
  'Finished',
  'Canceled',
  'Rejected',
  'Un-finished',
];

export function getNextStep(status, isOwner = false) {
  if (!isOwner) {
    switch (status) {
      case STATUS_APPROVED:
        return 'Waiting for owner send the book';
      case STATUS_SENDING:
        return 'Waiting for the book delivery';
      case STATUS_SENDING_BACK:
        return 'Waiting for the book received by owner';
      default:
        return '';
    }
  } else {
    switch (status) {
      case STATUS_SENDING:
        return 'Waiting for the book received by requestor';
      case STATUS_RECEIVED:
        return 'Book is borrowed by requestor';
      case STATUS_SENDING_BACK:
        return 'Waiting for the book delivery';
      default:
        return '';
    }
  }

}

