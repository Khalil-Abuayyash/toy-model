import axiosInstance from "../axios";

export default {
  isAuthenticated: () => {
    return axios
      .get("http://localhost:8000/authenticated")
      .then((res) => {
        if (res.status !== 401) {
          // console.log("suc")
          return res.data;
        } else {
          // console.log("401")
          return { isAuthenticated: false, user: { name: "", genre: "" } };
        }
      })
      .catch((err) => {
        // console.log("catch")
        return { isAuthenticated: false, user: { name: "", genre: "" } };
      });
  },
};
