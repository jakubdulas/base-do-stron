import { base_url } from "./settings";
import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, logoutUser } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: base_url,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens?.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${base_url}/api/token/refresh/`, {
      refresh: authTokens.refresh,
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(jwt_decode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;

    return req;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 404) {
        window.location.pathname = "/404";
      } else if (error.response.status === 401) {
        localStorage.clear();
        setAuthTokens(null);
        setUser(null);
        axiosInstance.defaults.headers["Authorization"] = null;
        logoutUser();
        navigate("/");
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
