import { getCookieValue } from './loginApi';

const setTokenHeaders = () => {
  const token = getCookieValue("authToken");
  const headers = {
    "X-Auth-Token": token,
  }

  return headers;
}

export { setTokenHeaders };