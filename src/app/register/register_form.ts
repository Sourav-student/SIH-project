import axios from 'axios';

type dataType = {
  email: string,
  user_name: string,
  password: string
}

export default async function userData(data : dataType) {
  const response = await axios.post('/api/auth/register', data)
  return response;
}