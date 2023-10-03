import { Axios } from ".";

export const ApiService = {
  /* AUTH APIS */
  loginUser: async (body) => {
    const { data } = await Axios.post(`api/auth/login`, {
      data: body,
    });
    return data;
  },
};
