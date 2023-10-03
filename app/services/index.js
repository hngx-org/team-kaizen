import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Axios = axios.create({
  baseURL: 'https://spitfire-interractions.onrender.com/',
});

let authToken; 
Axios.interceptors.request.use((config) => {


    /* const getData = async (itemKey) => {
        try {
            const jsonValue = await AsyncStorage.getItem(`${itemKey||'token'}`);
            authToken = jsonValue != null ? JSON.parse(jsonValue) : null
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    };

        getData()
            .then(data => data)
            .then(value => {
                setFullname(value)
                authToken = value
            }) */
       


  const token = authToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error?.response?.status) {
      window.location = "/";
    } else if (
      "Request failed with status code 500" === error.message ||
      error?.response?.status >= 500
    ) {
      return Promise.reject({
        ...error,
        message: "It's not you, it's us. Try again later.",
      });
    } else {
      return Promise.reject(error);
    }
  }
);
