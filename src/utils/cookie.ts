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

export const deleteCookies = (cookieName: string[]) => {
  cookieName.forEach(name => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};
