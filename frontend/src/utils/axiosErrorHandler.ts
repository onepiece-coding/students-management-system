import axios from "axios";

const axiosErrorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data || error.message;
  } else {
    return "An Unexpacted Error!";
  }
};

export default axiosErrorHandler;
