const getCookie = (key) => {
  if (document !== undefined) {
    const checkKeyExistence = document.cookie
                                .split("; ")
                                .find((current) => current.startsWith(`${key}=`));
    return checkKeyExistence ? true : false;
  }
}

const getCookieValue = (key) => {
    const CookieValue = document.cookie
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

const setCookie = (key, value) => {
  document.cookie = `${key} = ${value}; path=/;`;
};

const setCookieExpires = (key, value) => {
  let today = new Date(Date.now() + (15 * 60 * 60 * 1000));
  today = today.toUTCString();
  document.cookie = `${key} = ${value}; path=/; expires=${today};`;
};

const deleteCookie = (key) => {
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