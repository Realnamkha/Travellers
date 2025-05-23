import axios from "axios";

export const loginUser = (formData) => {
  return axios.post("http://localhost:8000/api/v1/users/login", formData);
};
