export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.newAccessToken) {
    return { Authorization: "Bearer " + user.newAccessToken };
  } else {
    return {};
  }
}
