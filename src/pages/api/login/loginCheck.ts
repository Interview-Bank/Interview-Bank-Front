const getCookie = (key: string) => {
  if (document !== undefined) {
    const checkKeyExistence = document.cookie
                                .split("; ")
                                .find((current) => current.startsWith(`${key}=`));
    return checkKeyExistence ? true : false;
  }
}

const getCookieValue = (key: string) => {
  const CookieValue = (document !== undefined) &&
                      document.cookie
                        .split("; ")
                        .find((current) => current.startsWith(`${key}=`))
                        .split("=")[1];
  return CookieValue;
}

const checkCookieExistence = () => {
  const CheckCookieArray = ["authToken", "userId"];
  const CheckArray = CheckCookieArray
                      .map((current) => getCookie(current))
                      .find((current) => current === false);
  return CheckArray === undefined ? true : false;
}

const setCookie = (key: string, value: string) => {
  document.cookie = `${key} = ${value}; path=/;`;
};

const setCookieExpires = (key: string, value: string) => {
  let today = new Date(Date.now() + (15 * 60 * 60 * 1000));
  today = today.toUTCString();
  document.cookie = `${key} = ${value}; path=/; expires=${today};`;
};

const deleteCookie = (key: string) => {
  let today = new Date();
  today = today.toUTCString();
  document.cookie = `${key}=; path=/; expires=${today}`;
}

const setTokenHeaders = () => {
  const token = getCookieValue("authToken");
  const headers = {
    "X-Auth-Token": token,
  }

  return headers;
}

export { getCookieValue, checkCookieExistence, setCookie, setCookieExpires, deleteCookie, setTokenHeaders }