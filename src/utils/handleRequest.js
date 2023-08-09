import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
});
const handleRequest = async (method, endPoint, data, cookies, role) => {
  try {
    console.log(data);
    const response = await api.request({
      method,
      url: endPoint,
      data,
      headers: {
        token: cookies,
        role,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.response);
  }
};

export default handleRequest;
