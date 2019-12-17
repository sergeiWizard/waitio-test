import { getAccessToken, getNewToken } from '../../waivioApi/ApiClient';

export const setToken = async (socialToken, social) => {
  const userData = await getAccessToken(socialToken, social);
  localStorage.setItem('accessToken', userData.token);
  const expiration = userData.expiration * 1000;
  localStorage.setItem('accessTokenExpiration', String(expiration));
  localStorage.setItem('socialName', social);
  return userData;
};

// eslint-disable-next-line no-unused-vars
export const getValidTokenData = async (token, expiration) => {
  // if (expiration && Date.now() > expiration) {
  const userData = await getNewToken(token);
  localStorage.setItem('accessToken', userData.token);
  localStorage.setItem('accessTokenExpiration', String(userData.expiration * 1000));
  return userData;
  // }
};
