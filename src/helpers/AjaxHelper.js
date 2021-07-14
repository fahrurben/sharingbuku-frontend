import { AUTH_TOKEN_KEY } from '../constant';

export function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

export const setConfig = () => {
  const apiToken = localStorage.getItem(AUTH_TOKEN_KEY);
  return {
    headers: { 'Authorization': `Bearer ${apiToken}` },
  };
};