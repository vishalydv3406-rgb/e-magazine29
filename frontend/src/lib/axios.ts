import axios from 'axios';
import { useStore } from '../store/useStore';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

instance.interceptors.request.use((config: any) => {
  const user = useStore.getState().user;
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default instance;
