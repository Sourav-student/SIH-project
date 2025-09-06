import axios from "axios";
type dataType = {
  user_name: string,
  password: string
}
export default async function loginData(data: dataType) {
  const response = await axios.post("/api/auth/login", data);
  return response;
}