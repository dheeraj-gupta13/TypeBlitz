function base64urlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");

  while (str.length % 4 !== 0) {
    str += "=";
  }

  return atob(str);
}

export function getCurrentUserToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function decodeJwt(token) {
  const [headerEncoded, payloadEncoded, signature] = token.split(".");
  const header = JSON.parse(base64urlDecode(headerEncoded));
  const payload = JSON.parse(base64urlDecode(payloadEncoded));
  return { header, payload, signature };
}

export function validateToken() {
  const token = getCurrentUserToken();
  if (token == null) return false;

  const info = decodeJwt(token);
  const { exp } = info.payload;
  if (Date.now() >= exp * 1000) {
    return false;
  } else {
    return true;
  }
}
