
export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem("token");
  if (!token) return null;
  // Obtain the payload of the token
  const payload = JSON.parse(window.atob(token.split(".")[1]));
  console.log(payload);
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    // Token has expired - remove it from localStorage
    localStorage.removeItem("token");
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  console.log("greg", token);
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(window.atob(token.split(".")[1])).user : null;
}

export function logOut() {
  const token = getToken();
  if (token !== null) {
    localStorage.removeItem('token');
  }
}

