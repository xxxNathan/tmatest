import axios from "axios";

// 创建一个 Axios 实例
const api = axios.create({
  // baseURL: "http://tr5bwq.natappfree.cc/v1/",
  baseURL: "/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(config.headers);
      console.log(`Bearer ${token}`); // 打印 token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data; // 只返回响应数据
  },
  (error) => {
    if (error.response) {
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// 封装 get 方法
const $get = async (url, config = {}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get(url, config);
    return response;
  } catch (error) {
    throw error;
  }
};

// 封装 post 方法
const $post = async (url, data, config = {}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post(url, data, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export { $get, $post };
