export function isToken() {
  const obj = localStorage.getItem("token");
  if (obj && obj.token) {
    return true;
  } else {
    return false;
  }
}
