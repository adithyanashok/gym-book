export const parseAxiosError = (error: any) => {
  if (error.response) {
    return {
      message: error.response.data?.message || "Request failed",
      error: error.response.data?.error || "Bad Request",
      statusCode: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    return {
      message: "Network error: Unable to connect to server",
      error: "Network Error",
      statusCode: 0,
    };
  } else {
    return {
      message: error.message || "An unexpected error occurred",
      error: "Request Error",
      statusCode: 0,
    };
  }
};
