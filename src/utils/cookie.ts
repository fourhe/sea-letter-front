type CookieKey = {
  'access-token': string;
  'refresh-token': string;
};

type CookieKeys = keyof CookieKey;

export const getCookieValue = (cookieName: CookieKeys) => {
  const cookies = document.cookie.split(';');

  const foundCookie = cookies.find(cookie => {
    const [name] = cookie.trim().split('=');
    return name === cookieName;
  });

  if (foundCookie) {
    const [, value] = foundCookie.split('=');
    return decodeURIComponent(value);
  }

  return null;
};
