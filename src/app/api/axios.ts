import axios, { CreateAxiosDefaults } from "axios";

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export default AxiosInstance;

export type ICreateAxiosInstance = {
  token: string;
} & CreateAxiosDefaults;

export const CreateAxiosInstance = (props: ICreateAxiosInstance) => {
  const { token, ...cleanProps } = props;
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...cleanProps,
  });
};
