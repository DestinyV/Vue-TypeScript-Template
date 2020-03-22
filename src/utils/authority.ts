import Cookies from "js-cookie";

const TokenKey = "auth-token";

export function getToken(): string | undefined {
  return Cookies.get(TokenKey);
}

export function setToken(token: string): string | undefined {
  return Cookies.set(TokenKey, token, { expires: 365, sameSite: "strict" });
}

export function removeToken(): void {
  return Cookies.remove(TokenKey);
}
