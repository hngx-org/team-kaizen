import { Axios } from ".";

export const ApiService = {
  /* AUTH APIS */
  loginUser: async (body) => {
    const { data } = await Axios.post(`api/auth/login`, body);
    return data;
  },
  registerUser: async (body) => {
    const { data } = await Axios.post(`api/auth/register`, body);
    return data;
  },
  getUser: async (body) => {
    const { data } = await Axios.get(`api/auth/${body}`);
    return data;
  },
  chatWithAI: async (body) => {
    const { data } = await Axios.post(`api/chat/completions`, body);
    return data;
  },
};
