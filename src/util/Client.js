import axios from "axios";
import firebase from "./Firebase";
const client = axios.create({
  baseURL: "https://fantasy-finance-backend.herokuapp.com",
});
client.interceptors.request.use(async (req) => {
  const token = await firebase.auth().currentUser.getIdToken();
  req.headers.Authorization = `Bearer ${token}`;
  return req
});
export default client;
