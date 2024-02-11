export const getCookieValue = (cookieName: string) => {
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
