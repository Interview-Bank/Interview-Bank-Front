const getCookie = (key) => {
  const checkKeyExistence = document.cookie
                              .split("; ")
                              .find((current) => current.startsWith(key));
  return checkKeyExistence ? true : false;
}

const getCookieValue = (key) => {
  if (getCookie(key)) {
    const CookieValue = document.cookie
                          .split("; ")
                          .find((current) => current.startsWith(key))
                          .split("=")[1];
    return CookieValue;
  } else return false;  
}

const checkCookieExistence = () => {
  const CheckCookieArray = ["authToken=", "userId="];
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

export { getCookieValue, checkCookieExistence, setCookie, setCookieExpires, deleteCookie }